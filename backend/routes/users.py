from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from datetime import datetime
import uuid

from lib.redis_client import redis_client
from lib.redis_queue import RedisQueue
from lib.logger import get_module_logger
from lib.status import Status

users_endpoint = Blueprint("users", __name__, url_prefix="/api/v1/users")

@file_analyzer_endpoint.route("/users", methods=["POST"])
def create_user():
    """
    Endpoint used to create a new user
    ---
    tags:
      - users
    description: "Endpoint used to create a new user"
    summary: "Endpoint used to create a new user"
    parameters:
      - name: "username"
        in: "body"
        description: "The name of the user"
        required: true
        type: "string"
    responses:
      200:
        description: "A new user was created was created"
      400:
        description: "generic error"
    """
    pass
    