import React from 'react';
import ProducDefault from '../assets/default-product-image.png';
import label from '../assets/label-tag.png'
import labelRed from '../assets/label-red.png'



function Product({ productData, isNew }) {
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    <img
                        src={productData?.thumb || `${ProducDefault}`} alt=""
                        className='w-[243px] h-[243px] object-conver' />
                    <img src={isNew ? labelRed : label} alt='' className={`absolute  ${isNew ? "w-[100px] top-[-28px] left-[-39px]"
                        : "w-[150px] top-[-39px] left-[-50px]"} object-contain`} />
                    <span className='font-bold text-white absolute top-[-10px] left-[-12px] '>{isNew ? 'New' : "Trending"}</span>

                </div>
                <div className='flex flex-col  mt-[15px] items-start gap-1 w-full'>
                    <div className='overflow-hidden line-clamp-1'>{productData?.title}</div>
                    <span>{Intl.NumberFormat().format(productData?.price) || ""}đ</span>
                </div>
            </div>
        </div>
    );
}

export default Product;