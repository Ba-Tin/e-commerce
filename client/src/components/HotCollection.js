import React from 'react';
import { useSelector } from 'react-redux';
import icons from '../ultils/icons';


const { IoIosArrowForward } = icons
function HotCollection() {
    const { categories } = useSelector(state => state.cate)
    console.log("categories", categories);
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTION</h3>
            <div className='w-full mt-[15px]'>
                <div className='flex flex-wrap gap-4'>
                    {categories?.filter(el => el.brand.length > 0).map(el => (
                        <div
                            key={el.id}
                            className='w-[396px] '
                        >
                            <div className='border flex p-4 gap-4 min-h-[202px]'>
                                <img src={el?.image} alt="" className=' w-[144px] h-[129px] object-contain' />
                                <div className='text-gray-700'>
                                    <h4 className='font-semibold uppercase'>{el.title}</h4>
                                    <ul className='text-sm'>
                                        {el?.brand?.map(item => (
                                            <span className='flex gap-2 items-center text-gray-500'>
                                                <IoIosArrowForward size={14} />
                                                <li key={item}>{item}</li>
                                            </span>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div >
    );
}

export default HotCollection;