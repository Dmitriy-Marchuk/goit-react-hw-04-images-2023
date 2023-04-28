import { useEffect, useState } from 'react';
import { AppContainer } from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import getGalleryCollection from 'services/api';
import ButtonLoadMore from './Button/Button';
import Loader from './Loader/Loader';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setCollection([]);
  // }, [searchName]);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    setLoading(true);

    getGalleryCollection({
      searchName,
      currentPage,
    })
      .then(data => {
        setCollection(prevHits => [...prevHits, ...data.hits]);
        setLoading(false);
        setTotalHits(data.totalHits);
        if (!data.totalHits) {
          return toast.warning(
            `No results were found for your search "${searchName}". Try something else!`
          );
        }
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, [searchName, currentPage]);

  const handleFormSubmit = queryName => {
    setSearchName(queryName);
    setCollection([]);
    setCurrentPage(1);
    setTotalHits(null);
  };

  const loadMoreBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const totalPages = totalHits / 12;

  return (
    <AppContainer>
      <SearchBar onSubmit={handleFormSubmit} queryName={searchName} />
      <ImageGallery collection={collection} />
      {loading && <Loader />}
      {totalPages > currentPage && (
        <ButtonLoadMore onClick={loadMoreBtn}>Load More</ButtonLoadMore>
      )}
      <ToastContainer autoClose={4000} />
    </AppContainer>
  );
};

export default App;
