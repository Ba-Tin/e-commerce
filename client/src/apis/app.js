import axios from '../axios';

export const apiGetCategories = () => axios({
    url: '/categoryproduct/',
    method: 'get'
})

export const getProducts = (params) => axios({
    url: '/product/',
    method: "get",
    params
})