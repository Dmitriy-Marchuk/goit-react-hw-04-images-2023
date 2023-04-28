import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState } from 'react';
import { ImageGalleryStyled } from './ImageGallery.styled';
import Modal from 'components/Modal/Modal';

const ImageGallery = ({ collection }) => {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  const onShowModal = ({ largeImageURL, tags }) => {
    setShowModal(true);
    setTags(tags);
    setLargeImageURL(largeImageURL);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTags('');
  };

  return (
    <>
      <ImageGalleryStyled>
        {collection.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            imageSmall={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            showModal={onShowModal}
          />
        ))}
      </ImageGalleryStyled>

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={onCloseModal}
        />
      )}
    </>
  );
};

export default ImageGallery;
