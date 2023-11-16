import React from 'react';
import Bookcard from './Bookcard';

const Booklist = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="books">
      {results.map((book) => {
        const imageUrl = book.formats?.['image/jpeg'];
        const link = `https://www.gutenberg.org/ebooks/${book.id}`;
        // console.log('Book:', book);
        // console.log('Image URL:', imageUrl);

        return (
          <Bookcard
            key={book.id}
            title={book.title}
            authors={book.authors.map((author) => formatAuthor(author.name)).join(', ')}
            imageURL={imageUrl}
            link={link}
          />
        );
      })}
    </div>
  );
};

const formatAuthor = (authorName) => {
  const [last, first] = authorName.split(',').map((namePart) => namePart.trim());
  return `${first} ${last}`;
};

export default Booklist;