export const categories = {
    men: ['new', 'clothing', 'shoes', 'bags', 'accessories', 'sale'],
    women: ['new', 'clothing', 'shoes', 'bags', 'accessories', 'sale']
}

export const subcategories = {
    men: {
        clothing:
            {
                CLOTHING: ['New in Clothing', 'View All', 'Coats', 'Jackets', 'Polo Shirts', 'Shirts', 'T-shirts',
                    'Sweaters', 'Hoodies', 'Cardigans', 'Suits'],
                PANTS: ['Jeans', 'Shorts', 'Pants', 'Joggers'],
                pictures: ['../../images/modelmen.avif']
            },
        shoes:
            {
                SHOES: ['New in Shoes', 'View All', 'Sandals', 'Loafers', 'Boots', 'Slippers'],
                SNEAKERS: ['Sneakers', 'Hi-top', 'Low-Top', 'Slip-on'],
                pictures: ['../../images/malecategorysneakers.avif']
            },
        bags: {BAGS: ['New in bags', 'View All', 'Backpacks', 'Totes', 'Clutches', 'Belt bags', 'Luggage'],
        pictures: ['../../images/menbag.avif']},
        accessories: {ACCESSORIES: ['New accessories', 'View All', 'Belts', 'Sunglasses', 'Gloves', 'Hats'],
        WATCHES: ['Watches', 'Digital watches', 'Classic watches'],
        pictures: ['../../images/watches.avif']},
        sale: {
            SALES: ['View All', 'Sale Clothing', 'Sale Coats', 'Sale Shoes',
                'Sale Sneakers', 'Sale Bags',],
            pictures: ['../../images/MEGANAV_MAIN-SALE.webp']
        },
    },
    women: {
        clothing:
            {
                CLOTHING: ['New in Clothing', 'View All', 'Coats', 'Jackets',
                    'Sweaters', 'Hoodies', 'Tops', 'Dresses', 'Beachwear'],
                PANTS: ['Jeans', 'Shorts', 'Pants', 'Skirts'],
                pictures: ['../../images/femalecategory.avif']
            },
        shoes:
            {
                SHOES: ['New in Shoes', 'View All', 'Espadrilles', 'Loafers', 'Mules', 'Pumps', 'Sandals'],
                SNEAKERS: ['Sneakers', 'Hi-top', 'Low-Top', 'Slip-on'],
                pictures: ['../../images/categoryboots.avif']
            },
        bags: {BAGS: ['New in bags', 'View All', 'Bucket bags', 'Mini bags', 'Totes', 'Clutches', 'Shoulder bags'],
        pictures: ['../../images/bagwomen.avif']},
        accessories: {ACCESSORIES: ['New accessories', 'View All', 'Belts', 'Sunglasses', 'Gloves', 'Hats'],
        JEWELRY: ['Bracelets', 'Earrings', 'Necklaces', 'Rings'],
        pictures: ['../../images/braceletad.avif']},
        sale: {
            SALES: ['View All', 'Sale Clothing', 'Sale Coats', 'Sale Shoes',
                'Sale Sneakers', 'Sale Bags'],
            pictures: ['../../images/MEGANAV_MAIN-SALE.webp']
        },
    },
}
