import React, {useState, useEffect} from 'react';
import './Home.css';
import './globals.css'
import Searchbar from '../components/Searchbar';
import Booklist from '../components/Booklist';
import { useNavigate } from 'react-router-dom';
const Home = () => {
	const [searchData, setSearchData] = useState(null);
	
	const navigate = useNavigate();

	const handleSearchSubmit = async (query) => {
    try {
      // Make an API call using fetch
			const encodedQuery = encodeURIComponent(query);
			
			console.log(encodedQuery);


      // Parse the JSON response
			navigate(`/results?query=${encodedQuery}`);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };

	const getTopBooks = async () => {
		try {
			const response = await fetch(`http://127.0.0.1:8000/books`);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const searchData = await response.json();
			setSearchData(searchData.results);
		} catch (error) {
			console.error('Error fetching search results:', error.message);
		}
	};
	useEffect(() => {
    getTopBooks();
  }, []);

	console.log(searchData);

  return (
	<div className='body'>

	<nav>
		<h1 className='homeHeader'>BOOKMARSHALL</h1>
		
		<div className="menu-icon">
			<div className="bar"></div>
			<div className="bar"></div>
			<div className="bar"></div>
		</div>
		
		<div className="menu">
		</div>
	</nav>
	
	<main>
		<div className="splash">
			<div className="catch">
				<Searchbar onSubmit={handleSearchSubmit} />
				<p>Search through thousands of free eBooks.</p>
			</div>

			<div className="top_books">
				<p>{'>'}TOP THIS WEEK</p>
				<div className="scrolling_div">
					{searchData !== null ? (
										<Booklist results={searchData.slice(1, 10)} />
									) : (
										<p>Loading...</p>
									)}
				</div>
			</div>
		</div>

		<div className="orange">
			
			<div className="top_books">
				<p>{'>'}BROWSE BY GENRE</p>
				<div className="scrolling_div">
					
				</div>
			</div>
			<div className="disclaimer">
				<p>
					BOOKMARSHALL SEEKS TO MAKE IT EASIER TO FIND FREE EBOOKS. ALL BOOKS LINK TO OUTSIDE
					SOURCES, NO BOOKS ARE HOSTED ON BOOKMARSHALL. FOR MORE INFORMATION ON OUR SOURCES 
					VISIT OUR ABOUT SECTION.
				</p>
			</div>
		</div>
		



		
	</main>
</div>
  );
};

export default Home;