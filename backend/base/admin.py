from django.contrib import admin
from .models import Product, Review, Order, OrderItem, ShippingAddress, ProductSize, ProductCategory, Wishlist, \
    ProductGender, Size


class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductSizeInline]

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        obj = form.instance
        obj.add_parent_categories()
    filter_horizontal = ['categories']


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(ProductSize)
admin.site.register(ProductCategory)
admin.site.register(Wishlist)
admin.site.register(ProductGender)
admin.site.register(Size)
