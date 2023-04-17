import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import getGalleryCollection from 'services/api';
import { ImageGalleryStyled } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    searchName: null,
    error: null,
    status: 'idle',
    showModal: false,
    collection: [],
  };

  showModal = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const searchQuery = this.props.searchName;

    if (prevName !== searchQuery) {
      const collection = await getGalleryCollection({ searchQuery });

      this.setState({ collection });
    }
  }
  render() {
    const { status, error, searchName } = this.state;

    // if (status === 'idle') {
    //   return <div>Enter your query in the search bar.</div>;
    // }
    // if (status === 'pending') {
    //   return <div>Download...</div>;
    // }
    // if (status === 'rejected') {
    //   return <div>{error.message}</div>;
    // }
    if (status === 'idle') {
      const { collection, showModal, largeImageURL } = this.state;
      return (
        <>
          <ImageGalleryStyled>
            {collection.map(
              ({ id, webformatURL, largeImageURL, tags, showModal }) => (
                <ImageGalleryItem
                  key={id}
                  imageSmall={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  showModal={this.showModal}
                />
              )
            )}
          </ImageGalleryStyled>
          {showModal && <Modal largeImageURL={largeImageURL} />}
        </>
      );
    }
  }
}
