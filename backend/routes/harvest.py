from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

from lib.mongo_client import pomodoro_db

harvests_endpoint = Blueprint("harvests", __name__, url_prefix="/api/v1/harvests")
harvests_collection = pomodoro_db['harvests']
users_collection = pomodoro_db['users']
centers_collection = pomodoro_db['centers']

@harvests_endpoint.route("/", methods=["POST"])
def create_harvest():
    """
    Endpoint used to create a new harvest
    ---
    tags:
      - harvests
    description: "Endpoint used to create a new harvest"
    summary: "Endpoint used to create a new harvest"
    parameters:
      - name: "body"
        in: "body"
        required: true
        schema:
          $ref: "#/definitions/harvest"
    responses:
      200:
        description: "A new harvest was created was created"
      404:
        description: "user_id or center_id not found"
      500:
        description: "generic error"
    definitions:
      harvest:
        type: "object"
        properties:
          user_id:
            type: "string"
            example: "1234567890ab"
          center_id:
            type: "string"
            example: "1234567890ab"
          material:
            type: "string"
            example: "plastic"
          quantity:
            type: "integer"
            example: 2
    """
    try:
        harvest_data = {}
        if request.data:
            harvest_data = dict(loads(request.data))
        
        user = users_collection.find_one({"_id": ObjectId(harvest_data['user_id'])})
        if not user:
            error_message = "User with id {} not found".format(harvest_data['user_id'])
            return error_message, 404
        
        center = centers_collection.find_one({"_id": ObjectId(harvest_data['center_id'])})
        if not center:
            error_message = "Center with id {} not found".format(harvest_data['center_id'])
            return error_message, 404

        harvest_data['center_approved'] = False
        harvests_collection.insert_one(harvest_data)

    except Exception as e:
        return "An error has occurred: {}".format(str(e)), 400
    harvest_data['_id'] = str(harvest_data['_id'])
    return jsonify(harvest_data)

@harvests_endpoint.route("/", methods=["GET"])
def get_all():
    """harvests endpoint
    return all harvests
    ---
    tags:
    - harvests
    summary: "Return all harvests"
    description: "return all harvests"
    responses:
      200:
        description: "Successful operation"
      500:
        description: "generic error"
    """
    try:
        harvests = harvests_collection.find()
        result = [harvest for harvest in harvests]
        for harvest in result:
            harvest['_id'] = str(harvest['_id'])

    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(result)

@harvests_endpoint.route("/<harvest_id>", methods=["GET"])
def get_harvest(harvest_id):
    """harvests endpoint
    return harvest list by id
    ---
    tags:
    - harvests
    summary: "Return harvest by id"
    description: "return harvest by id"
    parameters:
    - name: "harvest_id"
      in: "path"
      description: "ID of individual harvest to return"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
    
      404:
        description: "harvest not found in database"

      500:
        description: "generic error"
    """
    try:
        harvest = harvests_collection.find_one({"_id": ObjectId(harvest_id)})
        if not harvest:
            error_message = "User with id {} not found".format(harvest_id)
            return error_message, 404
        harvest['_id'] = str(harvest['_id'])
    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(harvest)

@harvests_endpoint.route("/pending/<center_id>", methods=["GET"])
def get_pending(center_id):
    """harvests endpoint
    return all pending harvests for a center ID
    ---
    tags:
    - harvests
    summary: "Return all harvests for a center ID"
    description: "return all harvests for a center ID"
    parameters:
    - name: "center_id"
      in: "path"
      description: "ID of individual center to return"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
      500:
        description: "generic error"
    """
    try:
        harvests = harvests_collection.find({"center_id": center_id, "center_approved": False})
        result = [harvest for harvest in harvests]
        for harvest in result:
            harvest['_id'] = str(harvest['_id'])

    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(result)


@harvests_endpoint.route("/<harvest_id>/approve", methods=["PUT"])
def approve_harvest(harvest_id):
    """harvests endpoint
    Approve a harvest by ID 
    ---
    tags:
    - harvests
    summary: "Return harvest by id"
    description: "return harvest by id"
    parameters:
    - name: "harvest_id"
      in: "path"
      description: "ID of individual harvest to return"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
    
      404:
        description: "harvest not found in database"

      500:
        description: "generic error"
    """
    try:
        updateResult = harvests_collection.update_one({"_id": ObjectId(harvest_id)}, {"$set": {'center_approved': True}})
        if updateResult.modified_count == 0:
            error_message = "unapproved harvest with id {} not found".format(harvest_id)
            return error_message, 404
        
        harvest= harvests_collection.find_one({"_id": ObjectId(harvest_id)})
        user = users_collection.find_one({"_id": ObjectId(harvest['user_id'])})
        to_set = {
            'points': user.get('points',0) + harvest.get('quantity', 0)
        }
        users_collection.update_one({"_id": user["_id"]}, {"$set": to_set})

    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify({"success": True})
