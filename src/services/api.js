import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '28343249-1460158105f561498120f2a7a';
const amountRow = 12;

const getGalleryCollection = async ({ searchQuery, page = 1 }) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${amountRow}`
  );

  return response.data.hits;
};

export default getGalleryCollection;
