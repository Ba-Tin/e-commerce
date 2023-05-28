import React, { useEffect, useState } from 'react';
import { SideBar, Banner, BesetSeller } from '../../components';

function Home() {

    return (
        <div className='w-main flex'>
            <div className='flex flex-col gap-5 w-[20%] flex-auto'>
                <SideBar />
                <span>Deal daily</span>
            </div>
            <div className='flex flex-col gap-5 pl-5 w-[80%] flex-auto'>
                <Banner />
                <BesetSeller />
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    );
}

export default Home;