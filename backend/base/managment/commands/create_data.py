from django.core.management.base import BaseCommand
from base.models import Product, ProductCategory, ProductGender, Size, ProductSize
from random import randint
from django.core.files import File
import os

class Command(BaseCommand):
    help = 'Create specific products'

    def handle(self, *args, **options):
        genders = ['men']
        existing_gender = ProductGender.objects.filter(name__in=genders)

        image_dir = './images'
        image_files = os.listdir(image_dir)
        image_files = sorted(image_files)
        image_files = [os.path.join(image_dir, image_file) for image_file in image_files]

        category_names = ['polo shirts', 'clothing']
        categories = ProductCategory.objects.filter(category__in=category_names)

        size_names = ['S', 'M', 'L', 'XS', 'XL']
        sizes = Size.objects.filter(size__in=size_names)

        product_data = [
            {
                "name": "Classic Cotton Polo",
                "short_description": "Timeless polo in soft cotton",
                "long_description": "Elevate your style with this classic cotton polo. Crafted with soft and breathable fabric, it offers comfort and sophistication for any occasion.",
            },
            {
                "name": "Slim Fit Polo Shirt",
                "short_description": "Contemporary slim fit polo",
                "long_description": "Achieve a modern and tailored look with this slim fit polo shirt. Its sleek design and slim silhouette make it a versatile choice for both casual and semi-formal outfits.",
            },
            {
                "name": "Striped Polo Tee",
                "short_description": "Sporty stripes and comfort",
                "long_description": "Make a sporty statement with this striped polo tee. Crafted with high-quality fabric, it offers a perfect blend of style and comfort.",
            },
            {
                "name": "Color Block Polo Shirt",
                "short_description": "Bold color blocking design",
                "long_description": "Stand out from the crowd with this color block polo shirt. Its eye-catching design adds a touch of modernity and flair to your wardrobe.",
            },
            {
                "name": "Performance Polo",
                "short_description": "Breathable and moisture-wicking",
                "long_description": "Stay cool and comfortable with this performance polo. Engineered with moisture-wicking fabric, it keeps you dry during active pursuits while maintaining a stylish appearance.",
            },
            {
                "name": "Printed Polo Shirt",
                "short_description": "Unique print for a stylish look",
                "long_description": "Make a statement with this printed polo shirt. Its unique print adds a touch of personality and individuality to your outfit.",
            },
            {
                "name": "Linen Blend Polo",
                "short_description": "Lightweight and breezy",
                "long_description": "Stay fresh and comfortable in this linen blend polo. Its lightweight fabric and relaxed fit make it perfect for warm weather and casual occasions.",
            },
            {
                "name": "Embroidered Logo Polo",
                "short_description": "Subtle logo embroidery",
                "long_description": "Add a touch of sophistication with this embroidered logo polo. Its subtle logo embroidery enhances the classic design, making it a versatile choice for various occasions.",
            },
            {
                "name": "Striking Striped Polo",
                "short_description": "Bold stripes for a confident look",
                "long_description": "Make a confident statement with this striking striped polo. Its bold stripes demand attention, while the comfortable fabric ensures all-day wearability.",
            },
            {
                "name": "Pocket Detail Polo Shirt",
                "short_description": "Stylish pocket accent",
                "long_description": "Elevate your casual style with this polo shirt featuring a stylish pocket detail. Its modern design combines comfort and functionality for a polished look.",
            },
            {
                "name": "Modern Striped Polo",
                "short_description": "Contemporary twist on stripes",
                "long_description": "Step up your style game with this modern striped polo. Its unique take on classic stripes adds a fresh and fashionable touch to your outfit.",
            },
            {
                "name": "Athletic Performance Polo",
                "short_description": "Enhanced breathability and flexibility",
                "long_description": "Stay ahead in the game with this athletic performance polo. Designed for active individuals, it offers optimal breathability and flexibility to support your active lifestyle.",
            },
            {
                "name": "Textured Polo Shirt",
                "short_description": "Distinctive texture for added style",
                "long_description": "Elevate your wardrobe with this textured polo shirt. Its subtle yet distinctive texture sets it apart, making it a go-to choice for a polished and refined look.",
            },
            {
                "name": "Tropical Print Polo",
                "short_description": "Island-inspired vibes",
                "long_description": "Infuse your style with tropical vibes with this island-inspired print polo. Perfect for warm-weather adventures, it exudes a laid-back and vibrant aesthetic.",
            },
            {
                "name": "Slim Fit Striped Polo",
                "short_description": "Streamlined style with stripes",
                "long_description": "Achieve a sleek and polished look with this slim fit striped polo. Its streamlined design and flattering fit make it a versatile piece for various occasions.",
            },
            {
                "name": "Colorful Polo Shirt",
                "short_description": "Vibrant hues for a playful look",
                "long_description": "Make a statement with this colorful polo shirt. Its vibrant hues add a playful and energetic touch to your wardrobe, ensuring you stand out with style.",
            },
            {
                "name": "Patterned Polo Tee",
                "short_description": "Eye-catching pattern for a unique look",
                "long_description": "Stand out from the crowd with this patterned polo tee. Its eye-catching pattern adds a touch of individuality and charm to your ensemble.",
            },
            {
                "name": "Contrast Trim Polo Shirt",
                "short_description": "Stylish contrast trim detailing",
                "long_description": "Enhance your polo collection with this contrast trim polo shirt. Its tasteful detailing and refined design create a sophisticated and fashionable aesthetic.",
            },
            {
                "name": "Vintage-Inspired Polo",
                "short_description": "Nostalgic vibes with a modern twist",
                "long_description": "Capture vintage-inspired style with a modern twist in this polo shirt. Its retro details and contemporary fit combine to create a unique and fashionable look.",
            },
            {
                "name": "Textured Collar Polo",
                "short_description": "Distinctive collar texture",
                "long_description": "Elevate your polo game with this textured collar polo. Its distinctive collar texture adds a touch of elegance and sophistication to your ensemble.",
            }
        ]

        # Print the list of dictionaries
        for data, image_path in zip(product_data, image_files):
            product = Product(
                name=data["name"],
                description_short=data["short_description"],
                description_long=data["long_description"],
                price=randint(100, 250),
                new=False
            )
            product.save()

            with open(image_path, 'rb') as image_file:
                product.image.save(image_path, File(image_file), save=False)
            product.save()

            for category in categories:
                product.categories.add(category)

            for gender in existing_gender:
                product.gender.add(gender)

            for size in sizes:
                product_size = ProductSize(
                    product=product,
                    size=size,
                    countInStock=10
                )
                product_size.save()

        self.stdout.write(self.style.SUCCESS('Successfully created specific products'))
