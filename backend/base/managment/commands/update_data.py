from base.models import Product
from django.db.models import F
from django.db.transaction import atomic
from django.core.management.base import BaseCommand
from decimal import Decimal


@atomic
class Command(BaseCommand):

    def handle(self, *args, **options):
        all_products = Product.objects.all()

        for index, product in enumerate(all_products, start=1):
            if index % 6 == 0:
                product.new = True

            elif index % 5 == 0:
                product.sale_price = product.price * Decimal('0.7')

            if index % 5 == 0 or index % 6 == 0:
                product.save()
