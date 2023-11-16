import React, { useState } from 'react';
import './Navbar.css'
import Searchbar from '../components/Searchbar';
import Menu from './Menu';
const Navbar = ({ onSubmit }) => {
  
  return (
    <nav>
      <h1>BM</h1>
      <Searchbar className='searchbar' onSubmit={onSubmit} />
      <Menu/>
    </nav>
  );
};

export default Navbar;