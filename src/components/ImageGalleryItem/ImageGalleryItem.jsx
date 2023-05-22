import PropTypes from 'prop-types';
import { GalleryItems, GalleryImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  src = '',
  alt = '',
  largeImage = '',
  isShowModal,
}) {
  const createModal = () => {
    isShowModal(largeImage, alt);
  };
  return (
    <GalleryItems>
      <GalleryImage src={src} alt={alt} onClick={createModal} />
    </GalleryItems>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  isShowModal: PropTypes.func.isRequired,
};
