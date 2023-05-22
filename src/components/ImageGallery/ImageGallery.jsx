import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import { GalleryList } from './ImageGallery.styled';

export default function ImageGallery({ pictures }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');

  const showModal = (largeImage, alt) => {
    setIsShowModal(true);
    setLargeImage(largeImage);
    setAlt(alt);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && <Modal src={largeImage} alt={alt} onClick={hideModal} />}

      <GalleryList>
        {pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              alt={tags}
              largeImage={largeImageURL}
              isShowModal={showModal}
            />
          );
        })}
      </GalleryList>
    </>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
};
