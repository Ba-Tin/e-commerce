import React, { useEffect, useState } from 'react';
import { getProducts } from '../apis/product'
import { CustomeSlider } from './';
import { getNewProducts } from '../store/product/asyncActions'
import { useDispatch, useSelector } from 'react-redux';

// 
const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },

]
function BesetSeller(props) {
    const [bestSeller, setBestSeller] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const { newProducts } = useSelector(state => state.products)


    const fetchProducts = async () => {
        const response = await getProducts({ sort: '-sold' })

        if (response?.success) {
            setBestSeller(response.products)
            setProducts(response.products)
        }
    }
    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
    }, [])

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSeller)
        if (activedTab === 2) setProducts(newProducts)

    }, [activedTab, newProducts, bestSeller])
    return (
        <div className='w-full'>
            <div className='w-full flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
                {
                    tabs.map(item => (
                        <span
                            key={item.id}
                            onClick={() => setActivedTab(item.id)}
                            className={`font-semibold uppercase border-r pr-3 text-gray-400 cursor-pointer ${activedTab === item.id ? 'text-gray-900' : ''}`}> {item.name}</span>
                    ))
                }
            </div>
            <div className='w-full mt-4 mx-[10px]'>
                <CustomeSlider products={products} activedTab={activedTab} />
                <div className='flex gap-4 w-full mt-4 px-[10px]'>
                    <img className='object-contain flex-1'
                        alt='banner'
                        src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657' />
                    <img className='object-contain flex-1'
                        alt='banner'
                        src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657' />
                </div>
            </div>
        </div>
    );
}

export default BesetSeller;