import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ImageGalleryStyled } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    searchName: '',
    error: null,
    showModal: false,
    collection: [],
    tags: '',
    currentPage: 1,
    totalHits: null,
    loading: false,
  };

  showModal = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      tags: '',
    });
  };

  render() {
    const collection = this.props.collection;

    return (
      <>
        <ImageGalleryStyled>
          {collection.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              imageSmall={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              showModal={this.showModal}
            />
          ))}
        </ImageGalleryStyled>

        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
