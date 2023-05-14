from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from base.models import ShippingAddress
from base.serializer import UserSchema, AddressSchema


@api_view(['POST'])
def login(request):
    serializer = TokenObtainPairSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = User.objects.get(username=request.data['username'])

    user_serializer = UserSchema(user)

    refresh = RefreshToken.for_user(user)

    res = Response()
    res.set_cookie(key='refresh_token', value=str(refresh), httponly=True)
    res.set_cookie(key='access_token', value=str(refresh.access_token), httponly=True)
    res.data = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': user_serializer.data,
    }
    return res


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    res = Response()
    res.delete_cookie('access_token')
    res.delete_cookie('refresh_token')
    return res


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSchema(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSchema(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSchema(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        )
        serializer = UserSchema(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user_for_deletion = User.objects.get(id=pk)
    user_for_deletion.delete()
    return Response('User was deleted')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsersById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSchema(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAddress(request):
    user = request.user
    address = ShippingAddress.objects.filter(user=user)
    serializer = AddressSchema(address, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createAddress(request):
    data = request.data
    user = request.user
    address = ShippingAddress.objects.create(
        user=user,
        addressName=data['addressName'],
        address=data['address'],
        city=data['city'],
        postalCode=data['postalCode'],
        country=data['country'],
        current_address=data['current_address'],
    )
    serializer = AddressSchema(address, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAddress(request, pk):
    user = request.user
    address = ShippingAddress.objects.get(_id=pk)
    if address.user != user:
        return Response("Operation Unauthorized")
    address.delete()
    return Response("Address deleted")


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateAddress(request):
    data = request.data
    user = request.user
    try:
        address = ShippingAddress.objects.get(_id=data['_id'])
    except ShippingAddress.DoesNotExist:
        return Response("Address not found", status=status.HTTP_404_NOT_FOUND)
    address.addressName = data.get('addressName')
    address.address = data.get('address')
    address.city = data.get('city')
    address.postalCode = data.get('postalCode')
    address.country = data.get('country')
    address.current_address = data.get('current_address')
    address.save()
    serializer = AddressSchema(address, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    user.save()

    serializer = UserSchema(user, many=False)
    return Response(serializer.data)