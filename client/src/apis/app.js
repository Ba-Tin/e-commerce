import axios from '../axios';

export const apiGetCategories = () => axios({
    url: '/categoryproduct/',
    method: 'get'
})