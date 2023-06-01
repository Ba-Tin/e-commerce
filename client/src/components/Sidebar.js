import React from 'react';
import { NavLink } from 'react-router-dom'
import { createSlug } from "../ultils/helper"
import { useSelector } from 'react-redux';


function Sidebar() {

    const { categories } = useSelector(state => state.reducer)
    return (
        <div className='flex flex-col border'>
            {categories?.map((el) => (
                <NavLink
                    key={el._id}
                    to={createSlug(el.title)}
                    className={({ isActive }) => {
                        return isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm'
                            : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    }}
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;