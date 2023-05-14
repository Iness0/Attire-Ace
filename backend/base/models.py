import uuid
from datetime import datetime, timedelta

from django.db import models
from django.contrib.auth.models import User


class Size(models.Model):
    size = models.CharField(max_length=10)

    def __str__(self):
        return self.size


class ProductGender(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class ProductCategory(models.Model):
    category = models.CharField(max_length=200, null=True)
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.CASCADE
    )
    gender = models.ManyToManyField(ProductGender, related_name="categories")

    def __str__(self):
        return self.category


class Product(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, null=False, blank=False)
    brand = models.CharField(max_length=200, null=True, blank=True)
    categories = models.ManyToManyField(ProductCategory, related_name='products', blank=True)
    gender = models.ManyToManyField(ProductGender, related_name='products')
    description_short = models.CharField(max_length=50, null=False, blank=False)
    description_long = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    sale_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    new = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.add_parent_categories()

    def add_parent_categories(self):
        for category in self.categories.all():
            parent = category.parent
            while parent:
                self.categories.add(parent)
                parent = parent.parent

    def set_new_status(self):
        """Check if product is new and update status accordingly."""
        if (datetime.now() - self.createdAt) > timedelta(days=30):
            self.new = False
            self.save()


class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sizes')
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    countInStock = models.IntegerField(null=True, blank=True, default=0)

    class Meta:
        unique_together = ('product', 'size')

    def __str__(self):
        return f'{self.product.name} - {self.size.size}'


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f'{self.user.username}\'s Wishlist'



class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    size = models.CharField(max_length=10, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    addressName = models.CharField(max_length=40, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, blank=True, null=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    current_address = models.BooleanField(default=True, blank=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def save(self, *args, **kwargs):
        if self.current_address:
            ShippingAddress.objects.filter(user=self.user).update(current_address=False)

        super(ShippingAddress, self).save(*args, **kwargs)

    def __str__(self):
        return self.address