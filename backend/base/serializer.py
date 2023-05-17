from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, ShippingAddress, OrderItem, Order, Review, ProductSize, ProductCategory, Size


class SizeSchema(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'


class ReviewSchema(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSizeSchema(serializers.ModelSerializer):
    size = serializers.StringRelatedField()

    class Meta:
        model = ProductSize
        fields = ['size', 'countInStock']


class ProductCategorySchema(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'category']


class AddressSchema(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class ProductSchema(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    sizes = ProductSizeSchema(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSchema(reviews, many=True)
        return serializer.data

    def create(self, validated_data):
        sizes_data = validated_data.pop('sizes')
        product = Product.objects.create(**validated_data)

        for size_data in sizes_data:
            size, _ = Size.objects.get_or_create(**size_data.pop('size'))
            ProductSize.objects.create(product=product, size=size, **size_data)

        return product


class UserSchema(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

#
# class UserSchemaWithToken(UserSchema):
#     token = serializers.SerializerMethodField(read_only=True)
#
#     class Meta:
#         model = User
#         fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
#
#     def get_token(self, obj):
#         token = RefreshToken.for_user(obj)
#         return str(token.access_token)


class ShippingAddressSchema(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSchema(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSchema(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSchema(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSchema(obj.shippingaddress, many=False)
        except:
            address = False
            return address
        return address.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSchema(user, many=False)
        return serializer.data
