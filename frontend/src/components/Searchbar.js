import React, { useState } from 'react';
import './Searchbar.css'

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form className='searchbar' onSubmit={handleSubmit}>
      <input className='search'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Searchbar;