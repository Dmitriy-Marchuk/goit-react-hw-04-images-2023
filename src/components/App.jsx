import { Component } from 'react';
import { AppContainer } from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchName: '',
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
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
