import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SearchFormBtn,
  SearchHeader,
  SearchbarForm,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';
export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error(' Your searchquery is empty :( Enter your search query!');
      return;
    }

    onSubmit(searchQuery);
  };

  return (
    <SearchHeader class="searchbar">
      <SearchbarForm class="form" onSubmit={handleSubmit}>
        <SearchFormBtn type="submit" class="button">
          <SearchIcon />
          <SearchFormButtonLabel class="button-label">
            Search
          </SearchFormButtonLabel>
        </SearchFormBtn>

        <SearchFormInput
          class="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </SearchbarForm>
    </SearchHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
