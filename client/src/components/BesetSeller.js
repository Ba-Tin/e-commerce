import React, { useEffect, useState } from 'react';
import { getProducts } from '../apis/product'
import Slider from "react-slick";
import Product from './Product';
import NewArrivals from './NewArrivals';

const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },

]

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

function BesetSeller(props) {
    const [bestSeller, setBestSeller] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const fetchProducts = async () => {
        const response = await Promise.all([getProducts({ sort: '-sold' }), getProducts({ sort: '-createdAt' })])
        console.log(response);
        if (response[0].success) {
            setBestSeller(response[0].products)
            setProducts(response[0].products)
        }
        if (response[1].success) setNewProducts(response[1].products)
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSeller)
        if (activedTab === 2) setProducts(newProducts)

    }, [activedTab])
    console.log("bess", bestSeller);
    return (
        <div>
            <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
                {
                    tabs.map(item => (
                        <span
                            key={item.id}
                            onClick={() => setActivedTab(item.id)}
                            className={`font-semibold capitalize border-r pr-3 text-gray-400 cursor-pointer ${activedTab === item.id ? 'text-gray-900' : ''}`}> {item.name}</span>
                    ))
                }
            </div>
            <div className='mt-4 mx-[10px]'>
                <Slider {...settings}>
                    {products?.map(item => (
                        <Product
                            key={item.id}
                            productData={item}
                            isNew={activedTab === 2 ? true : false}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default BesetSeller;