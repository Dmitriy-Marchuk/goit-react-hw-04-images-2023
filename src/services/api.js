import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '28343249-1460158105f561498120f2a7a';
const amountRow = 12;

const getGalleryCollection = async ({ searchName, currentPage = 1 }) => {
  return await axios
    .get(
      `/?q=${searchName}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${amountRow}`
    )
    .then(response => response.data);
};

export default getGalleryCollection;
