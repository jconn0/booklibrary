import logo from './logo.svg';
import './App.css';


function values() {
  // Using the fetch function to make the API call
  fetch('http://127.0.0.1:8000/books/?search=dickens%20great')
    .then(response => {
      // Check if the response status is OK (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON from the response
      return response.json();
    })
    .then(data => {
      // Handle the JSON data
      // console.log(data);
    })
    .catch(error => {
      // Handle errors during the fetch
      console.error('Error fetching data:', error);
    });
}

export default values;
