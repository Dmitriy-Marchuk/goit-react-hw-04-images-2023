import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit, queryName }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.searchName.value;

    if (searchName.trim() === '') {
      return toast.error('Wrong request! Write something before submit.');
    }
    if (queryName.trim() === inputValue) {
      return toast.warning(
        `You have already entered this query, with name "${inputValue}"!`
      );
    }
    onSubmit(searchName);
    event.target.reset();
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size={25} />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="searchName"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </Searchbar>
  );
};

export default SearchBar;
