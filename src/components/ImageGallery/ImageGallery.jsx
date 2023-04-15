import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    searchName: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=28343249-1460158105f561498120f2a7a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Invalid request "${nextName}" .`));
        })
        .then(data => this.setState({ data, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    const { status, error, searchName } = this.state;

    if (status === 'idle') {
      return <div>Enter your query in the search bar.</div>;
    }
    if (status === 'pending') {
      return <div>Download...</div>;
    }
    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolved') {
      const dataHits = this.state.data.hits;
      console.log(dataHits);
      return (
        <ul>
          {dataHits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id}>
              <img src={webformatURL} alt={tags} />
            </li>
          ))}
        </ul>
      );
    }
  }
}
