import React, { useState, useEffect } from 'react';
import './Results.css';
import './globals.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Booklist from '../components/Booklist';
import FilterComponent from '../components/Filters';
import SortingSelector from '../components/SortingSelector';
import Menu from '../components/Menu';

const ITEMS_PER_PAGE = 20; // Set the number of items per page

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSorting, setSelectedSorting] = useState('popular');

  const handleSortingChange = (sortingOption) => {
    setSelectedSorting(sortingOption);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('sort', selectedSorting);
    queryParams.set('page', currentPage);
    const newUrl = `/results?${queryParams.toString()}`;
    navigate(newUrl);
  }, [selectedSorting, currentPage, location.search, navigate]);

  const handleSearchSubmit = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      navigate(`/results?query=${encodedQuery}`);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };

  useEffect(() => {
    const handleUrl = async (query) => {
      try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`http://127.0.0.1:8000/books?search=${query}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const searchData = await response.json();
        setSearchData(searchData.results);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      }
    };

    handleUrl(location.search.substring(7));
  }, [location.search]);

  const totalPages = Math.ceil((searchData?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='body'>
      <Navbar onSubmit={handleSearchSubmit}/>
      <main>
        <div className="background">
          
          <div className="results">
            <FilterComponent results={searchData} />
            <div className='items-container'>
            <SortingSelector selectedSorting={selectedSorting} onSortingChange={handleSortingChange} />
              <div className="items">

                {searchData !== null ? (
                  <Booklist results={searchData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)} />
                ) : (
                  <p>Loading...</p>
                )}
                
                </div>
                {searchData && totalPages > 1 && (
                  <div className="pages">
                    {[...Array(totalPages).keys()].map((page) => (
                      <span
                        key={page}
                        className={page + 1 === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );  
};

export default SearchResultsPage;
