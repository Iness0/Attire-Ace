from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('', views.getUsers, name='users'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update/', views.updateUserProfile, name='user-update-profile'),
    path('login/', views.login, name='token_obtain_pair'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.registerUser, name='register'),
    path('address/', views.getAddress, name='addresses-get'),
    path('address/create/', views.createAddress, name='addresses-create'),
    path('address/delete/<str:pk>/', views.deleteAddress, name='addresses-delete'),
    path('address/update/', views.updateAddress, name='addresses-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('<str:pk>/', views.getUsersById, name='user')
]
