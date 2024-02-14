import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchDefaultParam = {
    key: '42291336-b4c9ef387c9d7e209159058e7',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}

export const searchPixabay = async (inputValue, page, perPage) => {
    try {
        const response = await axios.get(`?`, {
            params: {
                q: inputValue,
                ...searchDefaultParam,
                page: page,
                per_page: perPage
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
