import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
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
    if (this.props.queryName.trim() === inputValue) {
      return toast.warning(
        `You have already entered this query, with name "${inputValue}"!`
      );
    }

    this.props.onSubmit(searchName);
    event.target.reset();
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
