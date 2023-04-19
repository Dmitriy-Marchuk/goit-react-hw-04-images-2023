import { Component } from 'react';
import { AppContainer } from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import getGalleryCollection from 'services/api';
import ButtonLoadMore from './Button/Button';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    searchName: '',
    collection: [],
    currentPage: 1,
    totalHits: null,
    showModal: false,
    loading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, currentPage } = this.state;
    if (
      prevState.searchName !== searchName ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ loading: true });
      await getGalleryCollection({
        searchName,
        currentPage,
      })
        .then(data => {
          this.setState(prevState => ({
            loading: false,
            collection: [...prevState.collection, ...data.hits],
            totalHits: data.totalHits,
          }));
        })
        .catch(error => console.log(error.message));
    }
  }

  handleFormSubmit = queryName => {
    this.setState({
      searchName: queryName,
      collection: [],
      currentPage: 1,
      totalHits: null,
      showModal: false,
    });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { collection, loading, currentPage, totalHits, searchName } =
      this.state;
    const totalPages = totalHits / 12;

    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleFormSubmit} queryName={searchName} />
        <ImageGallery collection={collection} />
        {loading && <Loader />}
        {totalPages > currentPage && (
          <ButtonLoadMore onClick={this.loadMoreBtn}>Load More</ButtonLoadMore>
        )}
        <ToastContainer autoClose={4000} />
      </AppContainer>
    );
  }
}
