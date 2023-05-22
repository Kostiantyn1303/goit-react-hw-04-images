import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../Api/PixabeyApi';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { AppBox } from './App.styled';

import ImageGallery from './ImageGallery/ImageGallery';
export function App() {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    fetchImagesQuery(query, page);
  }, [query, page]);

  const fetchImagesQuery = async (query, page) => {
    setIsLoading(true);

    try {
      const response = await fetchImages(query, page);
      if (!response.totalHits) {
        throw new Error('No data :-(');
      }
      const selectedProperties = response.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        }
      );

      setPictures(prevPictures => [...prevPictures, ...selectedProperties]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevState => {
      return prevState.page + 1;
    });
  };
  const handleFormSubmit = searchQuery => {
    if (query !== searchQuery) {
      resetState();
      setQuery(searchQuery);
    }
  };
  const resetState = () => {
    setQuery('');
    setPictures([]);
    setPage(1);
    setError(null);
  };

  const isShowGallery = pictures.length > 0 && query;
  const isShowButton = isShowGallery && !isLoading && !(pictures.length % 12);

  return (
    <AppBox>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2500} />
      {isShowGallery && <ImageGallery pictures={pictures} page={page} />}
      {isShowButton && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
    </AppBox>
  );
}
