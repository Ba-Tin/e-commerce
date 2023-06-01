import React from 'react';
import { renderStartFromNumber } from '../ultils/helper';

const ProductCard = ({ image, price, totalsRatings, title }) => {
    return (
        <div className='w-1/3 flex-auto  px-[10px] mb-[20px]'>
            <div className='flex w-full border'>
                <img src={image} className='w-[90px] object-contain p-4' alt='products' />
                <div className='flex flex-col  mt-[15px] items-start gap-1 w-full text-xs'>
                    <div className='line-clamp-1 text-xs capitalize'>{title?.toLowerCase() || ""}</div>
                    <span className='flex gap-1 h-4 font-extralight'>{totalsRatings === 0 ? "Chưa có đánh giá" : renderStartFromNumber(totalsRatings, 14)}</span>
                    <span>{Intl.NumberFormat().format(price) || ""}đ</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;