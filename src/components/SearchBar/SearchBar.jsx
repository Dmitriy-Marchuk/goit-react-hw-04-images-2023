import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  Searchbar,
} from './SearchBar.styled';

export default class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.searchName.value;
    const { searchName } = this.state;

    if (searchName.trim() === '') {
      return toast.error('Wrong request! Write something before submit.');
    }

    // if (inputValue.trim() === searchName) {
    //   return toast.warning(
    //     `You have already entered this query, with value ${inputValue}`
    //   );
    // }
    this.props.onSubmit(searchName);
    console.log('searchbarHandleSubmit');
    this.setState({
      searchName: '',
      collection: [],
      currentPage: 1,
      totalHits: null,
      showModal: false,
    });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BsSearch size={25} />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="searchName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
