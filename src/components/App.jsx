import { Component } from 'react';
import { AppContainer } from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchName: '',
    collection: [],
    currentPage: 1,
    totalHits: null,
    showModal: false,
  };

  handleFormSubmit = queryName => {
    console.log('appHandleSubmit');
    this.setState({
      searchName: queryName,
      collection: [],
      currentPage: 1,
      totalHits: null,
      showModal: false,
    });
  };

  render() {
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={this.state.searchName} />
        <ToastContainer autoClose={4000} />
      </AppContainer>
    );
  }
}
