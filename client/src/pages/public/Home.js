import React from 'react';
import { SideBar, Banner, BesetSeller, DealDaily, FeatureProducts } from '../../components';

function Home() {

    return (
        <>
            <div className='w-main flex '>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <SideBar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BesetSeller />
                </div>
            </div>

            <div className='my-8'>
                <FeatureProducts />
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    );
}

export default Home;