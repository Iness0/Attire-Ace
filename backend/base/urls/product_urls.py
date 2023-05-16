from django.urls import path
from base.views import product_views as views



urlpatterns = [
    path('<str:gender>/cat/', views.getProducts, name='products'),
    path('create/', views.createProduct, name='product-create'),
    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('update/<str:pk>/', views.updateProduct, name='product-update'),
    path('top/', views.get_top_products, name='top-products'),
    path('wishlist/<str:pk>/', views.wishlistProduct, name='wishlist'),
    path('category/<str:category>/', views.getCategories, name='categories'),
    path('search/', views.searchProduct, name='search'),
    path('<str:gender>/cat/<str:category>/', views.getProductsByCategory, name='products-by-category'),
    path('<str:pk>/reviews/', views.createProductReview, name='create-review'),
    path('<str:pk>/', views.getProduct, name='product'),
]
