import React, { useEffect, useState } from 'react';
import { ProductCard } from './';
import { getProducts } from '../apis/product'


function FeatureProducts(props) {
    const [products, setProducts] = useState(null);


    const fetchProducts = async () => {
        const response = await getProducts({ limit: 9, totalsRatings: 5 })
        if (response.success) setProducts(response.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'> FEATURED PRODUCTS</h3>
            <div className='flex flex-wrap mt-[15px] mx-[-10px]'>
                {
                    products?.map((el, index) => (
                        <ProductCard
                            key={index}
                            image={el.thumb}
                            title={el.title}
                            totalsRatings={el.totalsRatings}
                            price={el.price}
                        />
                    ))
                }
            </div>
            <div className='flex justify-between'>
                <img className='w-[50%] object-contain' src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661' alt='banner' />

                <div className='flex flex-col justify-between w-[24%] object-contain gap-4'>
                    <img src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661' alt='banner' />
                    <img src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661' alt='banner' />

                </div>

                <img className='w-[24%] object-contain' src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661' alt='banner' />
            </div>
        </div>
    );
}

export default FeatureProducts;