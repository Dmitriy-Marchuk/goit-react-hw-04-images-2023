import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };
  handeSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.error('Wrong request! Write something before submit.');
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handeSubmit}>
          <button type="submit">
            <BsSearch />
          </button>
          <input
            type="text"
            name="searchName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
