middleware- import jwt
import pymongo
from django.http import JsonResponse

class JWTBlackListMiddleware:
    def __init__(self, get_Response):
        self.get_Response = get_Response
        self.mongo_client = pymongo.MongoClient("MONGO-URI")
    
    def __call__(self, request):
        access_token = request.META.get('AUTHORIZATION', ' ').split(' ')[1]
        if self.is_jwt_blacklisted(access_token):
            return JsonResponse({'ACCESS_DENIED':'JWT has expired'}, status = 401)
        response = self.get_Response

        return response
    
    def is_jwt_blacklist(self,access_token):
        logget_jwt_collection = self.mongo_client["loggedJWT"]
        blacklisted_jwt = logget_jwt_collection.find_one({'token': access_token})

        return blacklisted_jwt is not None
