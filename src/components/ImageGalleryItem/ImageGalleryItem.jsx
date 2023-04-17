import React from 'react';
import {
  ImageGalleryImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  id,
  imageSmall,
  largeImageURL,
  tags,
  showModal,
}) => {
  return (
    <ImageGalleryItemStyled key={id}>
      <ImageGalleryImage
        src={imageSmall}
        alt={tags}
        onClick={() => showModal({ largeImageURL, tags })}
      />
    </ImageGalleryItemStyled>
  );
};

export default ImageGalleryItem;
