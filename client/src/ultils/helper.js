import icons from './icons'

const { AiOutlineStar, AiFillStar } = icons;

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
export const formatMoney = number => Number(number.toFixed(1)).toLocaleString()

export const renderStartFromNumber = (number) => {
    if (!Number(number)) return
    const starsArray = []
    for (let i = 0; i < +number; i++) starsArray.push(<AiFillStar color='orange' />)
    for (let i = 5; i > +number; i--) starsArray.push(<AiOutlineStar color='orange' />)
    return starsArray
}