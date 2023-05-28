import React from 'react';
import { navigation } from '../ultils/contants';
import { NavLink } from 'react-router-dom';

function Navigation(props) {

    return (
        <div className='border-y mb-6 flex items-center w-main h-[48px] py-2 text-sm'>
            {navigation.map(el => (
                <NavLink
                    to={el.path}
                    key={el.id}
                    className={({ isActive }) => {
                        return isActive ? "pr-12 hover:text-main text-main" : "pr-12 hover:text-main"
                    }}
                >
                    {el.value}
                </NavLink>

            ))}
        </div>
    );
}

export default Navigation;