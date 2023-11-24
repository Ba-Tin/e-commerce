import React from 'react';
import CustomeSlider from './CustomeSlider';
import { useSelector } from 'react-redux';

function NewArrivals() {
    const { newProducts } = useSelector(state => state.products)
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
            <div className='w-full mt-[15px]'>
                <CustomeSlider
                    products={newProducts} />
            </div>

        </div >
    );
}

export default NewArrivals;