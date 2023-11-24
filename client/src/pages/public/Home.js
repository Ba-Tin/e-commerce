import React from 'react';
import { SideBar, Banner, BestSeller, DealDaily, FeatureProducts, NewArrivals, HotCollection, BlogPost } from '../../components';

function Home() {

    return (
        <>
            <div className='w-main flex '>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <SideBar />
                    {/* <DealDaily /> */}
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>

            <div className='my-8'>
                <FeatureProducts />
            </div>
            <div className='my-8'>
                <NewArrivals />
            </div>
            <div className='my-8'>
                <HotCollection />
            </div>
            <div className='my-8'>
                <BlogPost />
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    );
}

export default Home;