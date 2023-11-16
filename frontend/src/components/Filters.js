import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Filters.css';

const languageNames = {
  en: 'English',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  es: 'Spanish',
  fi: 'Finnish',
  ca: 'Catalan',
  eo: 'Esperanto',
  tl: 'Tagalog',
  enm: 'Middle English',
  nl: 'Dutch',
  hu: 'Hungarian',
};


const extractUniqueLanguages = (results) => {
  const allLanguages = results.reduce((languages, book) => {
    return languages.concat(book.languages || []);
  }, []);

  return [...new Set(allLanguages)];
};

const extractFrequentItems = (items) => {
  const itemCount = items.reduce((count, item) => {
    count[item] = (count[item] || 0) + 1;
    return count;
  }, {});

  return Object.keys(itemCount)
    .filter((item) => itemCount[item] > 1)
    .map((item) => ({ name: item, count: itemCount[item] }));
};

const extractUniqueBookshelves = (results) => {
  const allBookshelves = results.reduce((bookshelves, book) => {
    return bookshelves.concat(book.bookshelves || []);
  }, []);

  return extractFrequentItems(allBookshelves);
};

const extractUniqueSubjects = (results) => {
  const allSubjects = results.reduce((subjects, book) => {
    return subjects.concat(book.subjects || []);
  }, []);

  return extractFrequentItems(allSubjects);
};

const FilterComponent = ({ results }) => {
  const [isLanguagesCollapsed, setIsLanguagesCollapsed] = useState(true);
  const [isBookshelvesCollapsed, setIsBookshelvesCollapsed] = useState(true);
  const [isSubjectsCollapsed, setIsSubjectsCollapsed] = useState(true);
  const [isAuthorYearRangeCollapsed, setIsAuthorYearRangeCollapsed] = useState(true);


  const navigate = useNavigate();
  const location = useLocation();
  const filterOptions = results ? extractUniqueLanguages(results) : [];
  const bookshelfOptions = results ? extractUniqueBookshelves(results) : [];
  const subjectOptions = results ? extractUniqueSubjects(results) : [];

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedBookshelves, setSelectedBookshelves] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [authorYearStart, setAuthorYearStart] = useState('');
  const [authorYearEnd, setAuthorYearEnd] = useState('');


  const handleCheckboxChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((selected) => selected !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleBookshelfCheckboxChange = (bookshelf) => {
    if (selectedBookshelves.includes(bookshelf.name)) {
      setSelectedBookshelves(selectedBookshelves.filter((selected) => selected !== bookshelf.name));
    } else {
      setSelectedBookshelves([...selectedBookshelves, bookshelf.name]);
    }
  };

  const handleSubjectCheckboxChange = (subject) => {
    if (selectedSubjects.includes(subject.name)) {
      setSelectedSubjects(selectedSubjects.filter((selected) => selected !== subject.name));
    } else {
      setSelectedSubjects([...selectedSubjects, subject.name]);
    }
  };

  const handleApplyFilter = () => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedLanguages.length > 0) {
      queryParams.set('languages', selectedLanguages.join(','));
    } else {
      queryParams.delete('languages');
    }

    if (selectedBookshelves.length > 0) {
      queryParams.set('topic', selectedBookshelves.join(','));
    } else {
      queryParams.delete('topic');
    }

    if (selectedSubjects.length > 0) {
      queryParams.set('topic', selectedSubjects.join(','));
    } else {
      queryParams.delete('topic');
    }

    if (authorYearStart !== '') {
      queryParams.set('author_year_start', authorYearStart);
    } else {
      queryParams.delete('author_year_start');
    }

    if (authorYearEnd !== '') {
      queryParams.set('author_year_end', authorYearEnd);
    } else {
      queryParams.delete('author_year_end');
    }

    const newUrl = `/results?${queryParams.toString()}`;
    navigate(newUrl);
  };

  return (
    <div className='filters'>
      {/* Language Filter */}
      <div>
      <h4 onClick={() => setIsLanguagesCollapsed(!isLanguagesCollapsed)}>Languages</h4>
        {!isLanguagesCollapsed && (
        <ul>
          {filterOptions.map((language) => (
            <li key={language}>
              <label>
                <input
                  type="checkbox"
                  value={language}
                  checked={selectedLanguages.includes(language)}
                  onChange={() => handleCheckboxChange(language)}
                />
                {languageNames[language] || language}
              </label>
            </li>
          ))}
        </ul>
        )}
      </div>

      {/* Bookshelf Filter */}
      <div>
      <h4 onClick={() => setIsBookshelvesCollapsed(!isBookshelvesCollapsed)}>Bookshelves</h4>
        {!isBookshelvesCollapsed && (
        <ul>
          {bookshelfOptions.map((bookshelf) => (
            <li key={bookshelf.name}>
              <label>
                <input
                  type="checkbox"
                  value={bookshelf.name}
                  checked={selectedBookshelves.includes(bookshelf.name)}
                  onChange={() => handleBookshelfCheckboxChange(bookshelf)}
                />
                {`${bookshelf.name} (${bookshelf.count})`}
              </label>
            </li>
          ))}
        </ul>
        )}
      </div>

      {/* Subject Filter 
      Need to find a way to consolidate
      <div>
      <h4 onClick={() => setIsSubjectsCollapsed(!isSubjectsCollapsed)}>Subjects</h4>
        {!isSubjectsCollapsed && (
        <ul>
          {subjectOptions.map((subject) => (
            <li key={subject.name}>
              <label>
                <input
                  type="checkbox"
                  value={subject.name}
                  checked={selectedSubjects.includes(subject.name)}
                  onChange={() => handleSubjectCheckboxChange(subject)}
                />
                {`${subject.name} (${subject.count})`}
              </label>
            </li>
          ))}
        </ul>
        )}
      </div> */}

      <div>
      <h4 onClick={() => setIsAuthorYearRangeCollapsed(!isAuthorYearRangeCollapsed)}>Author Year Range</h4>
        {!isAuthorYearRangeCollapsed && (
        <div className='years'>
        <label>
          <input
            className='year-input'
            value={authorYearStart}
            onChange={(e) => setAuthorYearStart(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            className='year-input'
            value={authorYearEnd}
            onChange={(e) => setAuthorYearEnd(e.target.value)}
          />
        </label>
      </div>
        )}
        </div>

      {/* Apply Filter button */}
      <button className='filterbtn' onClick={handleApplyFilter}>Apply Selected Filters</button>
    </div>
  );
};

export default FilterComponent;
