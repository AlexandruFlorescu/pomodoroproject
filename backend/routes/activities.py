from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from bson import Binary

from lib.mongo_client import pomodoro_db

activities_endpoint = Blueprint("activities", __name__, url_prefix="/api/v1/activities")
activities_collection = pomodoro_db['activities']

@activities_endpoint.route("/activity", methods=["POST"])
def create_activity():
    """
    Endpoint used to create a new activity
    ---
    tags:
      - activities
    description: "Endpoint used to create a new activity"
    summary: "Endpoint used to create a new activity"
    parameters:
      - name: "body"
        in: "body"
        required: true
        schema:
          $ref: "#/definitions/Activity"
      - in: formData
        name: photo
        type: file
        description: The zip to upload.
    responses:
      200:
        description: "A new activity was created was created"
      400:
        description: "generic error"
    definitions:
      Activity:
        type: "object"
        properties:
          date:
            type: "string"
            example: "12/12/2022 20:00"
          description:
            type: "string"
            example: "A description example"
          location:
            type: "string"
            example: "Tineretului Park"
          
    """
    try:
        activity_data = {}
        if request.data:
            activity_data = dict(loads(request.data))
        
        # if "photo" in request.files:
        #     a = request.files["photo"].read()

        #     activity_data["photo"] = a
            
        activities_collection.insert_one(activity_data)
    except Exception as e:
        return "An error has occurred: {}".format(str(e)), 400
    activity_data['_id'] = str(activity_data['_id'])
    return jsonify(activity_data)

@activities_endpoint.route("/", methods=["GET"])
def get_all():
    """activities endpoint
    return all activities
    ---
    tags:
    - activities
    summary: "Return all activities"
    description: "return all activities"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
    """
    try:
        activities = activities_collection.find()
        result = [activity for activity in activities]
        for activity in result:
            activity['_id'] = str(activity['_id'])

    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(result)

@activities_endpoint.route("/<activity_id>", methods=["GET"])
def get_activity(activity_id):
    """activities endpoint
    return activities list by id
    ---
    tags:
    - activities
    summary: "Return activity by id"
    description: "return activity by id"
    parameters:
    - name: "activity_id"
      in: "path"
      description: "ID of individual activity to return"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
      404:
        description: "activity not found in database"
    """
    try:
        activity = activities_collection.find_one({"_id": ObjectId(activity_id)})
        if not activity:
            error_message = "activity with id {} not found".format(activity_id)
            return error_message, 404
        activity['_id'] = str(activity['_id'])
    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(activity)
