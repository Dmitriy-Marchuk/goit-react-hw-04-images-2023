import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    searchName: null,
    loading: false,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=28343249-1460158105f561498120f2a7a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`запрос ${nextName} не верный!`));
        })
        .then(console.log)
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { status, error, searchName } = this.state;

    // if (status === 'idle') {
    //   return <div>Введите запрос в строку поиска.</div>;
    // }
    // if (status === 'pending') {
    //   return <div>Загрузка...</div>;
    // }
    return (
      <div>
        {error && <p>{error.message}</p>}
        {this.state.loading && <div>Download...</div>}
        {this.state.searchName && <div>{this.props.searchName}</div>}
        {/* <ul>
          <li>{this.props.searchName}</li>
        </ul> */}
      </div>
    );
  }
}
