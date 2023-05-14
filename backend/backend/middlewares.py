import time
import jwt
from django.contrib.auth.models import User
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import RefreshToken


class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('access_token')
        if token:
            decoded_token = jwt.decode(token, options={"verify_signature": False})
            if time.time() > decoded_token['exp']:
                refresh_token = request.COOKIES.get('refresh_token')
                if refresh_token:
                    try:
                        RefreshToken(refresh_token)
                        user = User.objects.get(id=decoded_token['user_id'])
                        new_tokens = RefreshToken.for_user(user)
                        request.META['HTTP_AUTHORIZATION'] = f'Bearer {str(new_tokens.access_token)}'
                        response = self.get_response(request)
                        response.set_cookie('access_token', str(new_tokens.access_token), httponly=True)
                        return response
                    except Exception as e:
                        print(e)
            else:
                request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
