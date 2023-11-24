import React, { memo } from 'react';
import Slider from "react-slick";
import { Product } from './';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

function CustomeSlider({ products, activedTab }) {
    return (
        <>
            {products && <Slider {...settings}>
                {products?.map((item, index) => (
                    <Product
                        key={index}
                        pid={item.id}
                        productData={item}
                        isNew={activedTab === 2 ? true : false}
                    />
                ))}

            </Slider>}
        </>
    );
}

export default memo(CustomeSlider);