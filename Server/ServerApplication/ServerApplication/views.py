from datetime import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
import jwt
import pymongo


class GWTView(APIView):
    def post(self, request):
        gwt = request.data.get('gwt')

        if gwt:
            try:

                decoded_payload = jwt.decode(gwt, algorithms=['HS256'],
                                             options={"verify_signature": False, "verify_aud": False})
                expiration_time = datetime.fromtimestamp(decoded_payload['exp'])
                current_time = datetime.now()

                if current_time < expiration_time:
                    return Response({"message":decoded_payload})

                self.blacklist_jwt(gwt)
            except jwt.ExpiredSignatureError:
                return Response({'error': 'Timeout'}, status=400)
            except jwt.DecodeError:
                return Response({'error': 'Invalid token'}, status=400)
        else:
            return Response({'error': 'No token provided in the request'}, status=400)

    def blacklist_jwt(self, access_token):
        mongo_client = pymongo.MongoClient(
            "mongodb+srv://kahitoz:86goMFAJDSOjGJvr@cluster0.pp8efut.mongodb.net/?retryWrites=true&w=majority")
        logged_jwt_collection = mongo_client["loggedJWT"]
        logged_jwt_collection.insert_one({"token": access_token})
