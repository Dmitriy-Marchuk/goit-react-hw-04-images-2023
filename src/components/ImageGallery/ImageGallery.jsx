import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import getGalleryCollection from 'services/api';
import { ImageGalleryStyled } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';
import ButtonLoadMore from 'components/Button/Button';

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

  loadMoreBtn = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchName;
    const { currentPage } = this.state;

    if (
      prevProps.searchName !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ loading: true });
      await getGalleryCollection({
        searchQuery,
        currentPage,
      }).then(data => {
        this.setState(prevState => ({
          loading: false,
          collection: [...prevState.collection, ...data.hits],
          totalHits: data.totalHits,
        }));
      });
    }
  }

  render() {
    const { collection, showModal, largeImageURL, tags, totalHits } =
      this.state;
    const totalPages = totalHits / 12;
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
        {totalPages > this.state.currentPage && (
          <ButtonLoadMore onClick={this.loadMoreBtn}>Load More</ButtonLoadMore>
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
