from email.headerregistry import Address
from urllib.parse import unquote

from django.conf import settings
from django.db.models import Q, Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Review, Wishlist, ProductCategory, ProductSize
from base.serializer import ProductSchema, ProductCategorySchema, AddressSchema
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status


def paginate(query, page):
    paginator = Paginator(query, settings.MAX_ITEMS_PER_PAGE)
    try:
        paginated_query = paginator.page(page)
    except PageNotAnInteger:
        paginated_query = paginator.page(1)
    except EmptyPage:
        paginated_query = paginator.page(paginator.num_pages)

    if page is None or page == 'null':
        page = 1
    return paginated_query, int(page), paginator.num_pages


@api_view(['GET'])
def getProducts(request, gender):
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')
    if query is None or query == 'null':
        query = ''

    products = Product.objects.filter(
        name__icontains=query,
        gender__name=gender,
    ).distinct()
    products, page, total_pages = paginate(products, page)
    print(products, page, total_pages)
    serializer = ProductSchema(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': total_pages})


@api_view(['GET'])
def getProductsByCategory(request, category, gender):
    page = request.GET.get('page', 1)
    subcategory = request.GET.get('category', None)
    size = request.GET.get('size', None)
    min_price = request.GET.get('min', None)
    max_price = request.GET.get('max', None)
    sort = request.GET.get('sort', None)

    query = Q(gender__name=gender)

    if category == 'sale':
        query &= Q(sale_price__gt=0)
    elif category == 'new':
        query &= Q(new=True)

    if subcategory:
        decoded_category_str = unquote(subcategory)
        category_list = [cname for cname in decoded_category_str.split('|')]
        if 'sale' in category_list:
            category_list.remove('sale')
            query &= Q(sale_price__gt=0)
        query &= Q(categories__category__in=category_list)
    else:
        if category != 'sale' and category != 'new':
            query &= Q(categories__category=category)

    if size:
        decode_size = unquote(size)
        size_id_list = [int(sid) for sid in decode_size.split('|')]
        query &= Q(sizes__size__in=size_id_list)

    if min_price:
        query &= Q(price__gte=float(min_price))

    if max_price:
        query &= Q(price__lte=float(max_price))

    products = Product.objects.filter(query).distinct()

    if sort:
        if sort == 'price_asc':
            products = products.order_by('price')
        elif sort == 'price_desc':
            products = products.order_by('-price')
        elif sort == 'by_new':
            products = products.order_by('-new')

    products, page, total_pages = paginate(products, page)
    serializer = ProductSchema(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': total_pages})


@api_view(['GET'])
def getCategories(request, category):
    if category == "sale":
        sale_products = Product.objects.filter(sale_price__gt=0)
        sizes = ProductSize.objects.filter(product__in=sale_products).values('size__id', 'size__size').distinct()

        categories_with_counts = (
            ProductCategory.objects.filter(products__in=sale_products, parent__isnull=False)
            .annotate(product_count=Count("products"))
            .values("category", "product_count")
        )
        serializer = ProductCategorySchema(categories_with_counts, many=True)
        return Response({'categories': serializer.data, 'sizes': sizes})

    elif category == "new":
        new_products = Product.objects.filter(new=True)
        sizes = ProductSize.objects.filter(product__in=new_products).values('size__id', 'size__size').distinct()

        categories_with_counts = (
            ProductCategory.objects.filter(products__in=new_products, parent__isnull=False)
            .annotate(product_count=Count("products"))
            .values("category", "product_count")
        )
        serializer = ProductCategorySchema(categories_with_counts, many=True)
        return Response({'categories': serializer.data, 'sizes': sizes})

    gender = request.GET.get('gender', 'men')
    categories = ProductCategory.objects.filter(parent__category=category, gender__name=gender)
    sizes = ProductSize.objects.filter(product__categories__in=categories).values('size__id', 'size__size').distinct()
    serializer = ProductCategorySchema(categories, many=True)
    return Response({'categories': serializer.data, 'sizes': sizes})


@api_view(['GET'])
def getProduct(request, pk):
    product = (
        Product.objects
        .filter(_id=pk)
        .prefetch_related('gender', 'categories')
        .first()
    )

    if product:
        genders = product.gender.all()
        categories = product.categories.all()
        category_count = categories.count()

        related_products = Product.objects.filter(
            Q(gender__in=genders) & Q(categories__in=categories) & ~Q(_id=pk)
        ).annotate(
                matched_categories_count=Count("categories")
            ).filter(
                matched_categories_count=category_count
            ).distinct()[:4]

    else:
        related_products = []
    serializer = ProductSchema(product, many=False)
    additional_serializer = ProductSchema(related_products, many=True)
    return Response({'product': serializer.data, 'related_products': additional_serializer.data})


@api_view(['GET'])
def searchProduct(request):
    keyword = request.GET.get('keyword', None)
    page = request.GET.get('page', 1)

    products = Product.objects.filter(name__icontains=keyword)
    products, page, total_pages = paginate(products, page)
    serializer = ProductSchema(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': total_pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def wishlistProduct(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    wishlist, created = Wishlist.objects.get_or_create(user=user)
    wishlist.products.add(product)
    return Response('Product added to wishlist')





@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample',
        price=0,
        brand='sample Brand',
        category="Sample Category",
        description=''
    )
    serializer = ProductSchema(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.save()
    serializer = ProductSchema(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    already_exists = product.review_set.filter(user=user).exists()
    if already_exists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response({'detail': 'Review was added'})


@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSchema(products, many=True)
    return Response(serializer.data)
