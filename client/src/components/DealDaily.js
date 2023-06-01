import React, { useEffect, useState, memo } from 'react';
import icons from '../ultils/icons';
import { getProducts } from '../apis/product'
import ProducDefault from '../assets/default-product-image.png';
import { renderStartFromNumber, secondsToHMS } from '../ultils/helper';
import { CountDown } from './';
import moment from 'moment';

const { AiFillStar, BiMenu } = icons;
let idInterval;
function DealDaily(props) {
    const [dealdaily, setDealDaily] = useState(null);
    //countdown
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false)

    const fetchDealDaily = async () => {
        const response = await getProducts({ limit: 1, page: Math.round(Math.random() * 10), totalsRatings: 5 })
        if (response.success) {
            setDealDaily(response?.products[0])

            const today = `${moment().format("MM/DD/YYYY")} 5:00:00`
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
            console.log(seconds);
            const number = secondsToHMS(seconds)

            setHour(number.h);
            setMinute(number.h);
            setSecond(number.s);
        } else {
            setHour(0);
            setMinute(59)
            setSecond(59)
        }
    }


    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    }, [expireTime])
    //coutdown
    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond(prev => prev - 1)
            else {
                if (minute > 0) {

                    setMinute(prev => prev - 1)
                    setSecond(59)
                }
                else {
                    if (hour > 0) {
                        setHour(prev => prev - 1)
                        setMinute(59)
                        setSecond(59)
                    } else {
                        setExpireTime(!expireTime)
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval)
        }
    }, [second, minute, hour, expireTime])
    return (
        <div className='w-full border flex-auto'>
            <div className='flex items-center justify-beween p-4'>
                <span className='flex-1 flex justify-center'><AiFillStar color='#DD1111' size={20} /></span>
                <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-700'>Deal Daily</span>
                <span className='flex-1'></span>
            </div>

            <div className='w-full flex flex-col items-center px-4 pt-8 gap-2'>
                <img
                    src={dealdaily?.thumb || `${ProducDefault}`} alt=""
                    className='w-[274px] h-[274px] object-conver' />
                <span className='overflow-hidden line-clamp-1 text-center'>{dealdaily?.title || ""}</span>
                <span className='flex gap-1 h-4 font-extralight'>{dealdaily?.totalsRatings === 0 ? "Chưa có đánh giá" : renderStartFromNumber(dealdaily?.totalsRatings, 20)}</span>
                <span>{Intl.NumberFormat().format(dealdaily?.price) || ""}đ</span>
            </div>

            <div className='px-4 mt-4 mb-8'>
                <div className='flex  mb-8 gap-3 justify-center'>
                    <CountDown unit={"Hours"} number={hour} />
                    <CountDown unit={"Minutes"} number={minute} />
                    <CountDown unit={"Seconds"} number={second} />
                </div>


                <button
                    type='button'
                    className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                >
                    <BiMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
}

export default memo(DealDaily);