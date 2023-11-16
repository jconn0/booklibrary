import React from 'react';
import { Link } from 'react-router-dom';
import './Bookcard.css';
import noimagefound from '../icons/noimagefound.png'

const Bookcard = ({ title, authors, imageURL, link }) => {
  // Ensure authors is always an array
  const authorsArray = Array.isArray(authors) ? authors : [authors];

  return (
    <div className="card">
      <a href={link.trim()} target="_blank" rel="noopener noreferrer">
        {imageURL ? (
          <img src={imageURL} alt={title} />
        ) : (
          <img src={noimagefound} alt="Cover Not Found" className="no-image" />
        )}
        <div className="title">{title}</div>
      </a>
      <div className="authors">
        {authorsArray.map((author, index) => (
          <span key={index}>
            <Link to={`/results?query=${encodeURIComponent(author)}`}>{author}</Link>
            {index < authorsArray.length - 1 && ', '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Bookcard;
