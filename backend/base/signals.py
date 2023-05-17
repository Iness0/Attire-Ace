from django.db.models.signals import pre_save, m2m_changed
from django.contrib.auth.models import User
from base.models import Product


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)


#AutoAdd categories
# m2m_changed.connect(Product.add_parent_categories, sender=Product.categories.through)
