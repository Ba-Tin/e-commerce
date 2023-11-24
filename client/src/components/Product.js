import React, { useState } from 'react';
import ProducDefault from '../assets/default-product-image.png';
import newLabel from '../assets/new.png';
import trending from '../assets/trending.png';
import { renderStartFromNumber } from '../ultils/helper';
import { SelectOption } from './';
import icons from '../ultils/icons';

const { AiOutlineStar, BiMenu, AiTwotoneHeart } = icons
function Product({ productData, isNew }) {

    const [isShowOption, setIsShowOption] = useState(false)
    return (
        <div className='w-full text-base px-[10px]'>
            <div
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    {
                        isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex gap-3 justify-center animate-slide-top'>
                            <SelectOption icon={<AiOutlineStar />} />
                            <SelectOption icon={<BiMenu />} />
                            <SelectOption icon={<AiTwotoneHeart />} />
                        </div>
                    }

                    <img
                        src={productData?.thumb || `${ProducDefault}`} alt=""
                        className='w-[274px] h-[274px] object-conver' />
                    <img src={isNew ? newLabel : trending} alt='' className={`absolute h-[34px] w-[80px] top-[-15px] right-[-15px]`} />

                </div>
                <div className='flex flex-col  mt-[15px] items-start gap-1 w-full'>
                    <span className='flex gap-1 h-4 font-extralight'>{productData?.totalsRatings === 0 ? "Chưa có đánh giá" : renderStartFromNumber(productData?.totalsRatings, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <div className='overflow-hidden line-clamp-1'>{productData?.title}</div>
                    <span>{Intl.NumberFormat().format(productData?.price) || ""}đ</span>
                </div>
            </div>
        </div>
    );
}

export default Product;