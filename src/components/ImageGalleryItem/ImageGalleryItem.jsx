import React from 'react';
import {
  ImageGalleryImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, imageSmall, tags }) => {
  return (
    <ImageGalleryItemStyled key={id}>
      <ImageGalleryImage src={imageSmall} alt={tags} />
    </ImageGalleryItemStyled>
  );
};

export default ImageGalleryItem;
