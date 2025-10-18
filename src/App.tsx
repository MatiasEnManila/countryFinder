import { useRef, useState } from 'react';  
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png'
import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";


// Add click on suggestion*

function App() {
  
  // USEREF PERSIST BETWEEN RENDERS, IT'LL BE AVAILABLE IN THE NEXT RENDER (AND CHANGES IN YOUR USEREF WONT TRIGGER A NEW RENDER, UNLIKE USESTATE)
  let searchedCountry = useRef('');
  const [countryName, setCountryName] = useState('');
  const [frontFace, setFrontFace] = useState(true);
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  const [suggestion, setSuggestion] = useState([]);

  
  const handleInputChange = (event: string) => {
    searchedCountry.current = event.target.value.toLowerCase();
    setCountryName(searchedCountry.current);
  
    if (searchedCountry.current.length > 0) {
      const filteredSearch = allCountriesNames.filter(item => 
        item.toLowerCase().includes(searchedCountry.current.toLowerCase())
      );
      setSuggestion(filteredSearch);
    } else {
      setSuggestion([]);
    }
  }
  
  const getAllCountriesNames = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all?fields=name`);
      const data = await response.json();      
      return setAllCountriesNames(data.map(country => country.name.common).sort());	
    } catch (err) {
      console.error(err);
    }
  }

  if (allCountriesNames.length === 0) getAllCountriesNames(); 


  // Clicking
  const getDisplayCountry = () => {
    if (countryName === '') {
      return alert('Please insert a country!');
    }
    setFrontFace(!frontFace);
  }

  // Enter key - REVISE
  const pressEnterKey = (event) => {
    if (event.key === 'Enter') {
      if (countryName === '') {
        return alert('Please, insert a country!');
      } 
      getDisplayCountry();
      event.preventDefault();
      setFrontFace(!frontFace);
    }
  }


  const goBack = () => {
   setFrontFace(!frontFace);
   setCountryName('');
  }
  


  if (frontFace) {
    return (
      <>
        <div className='frontface-div'>
          <div>
            <h1 className='title fw-medium text-center'>Find a country!</h1>
            <div>
              <input
                className='input'
                type="text"
                placeholder="Search country"
                onChange={ handleInputChange }
                onKeyDown={ pressEnterKey }
              />
              {suggestion.length > 0 && (
                <ul>
                  {suggestion.map((suggestion, index) => (
                    <li className='suggestions'  key={suggestion}>{suggestion}</li>
                  ))} 
                </ul>
              )}
              <button type="button" className='btn btn-dark search-button' onClick={ getDisplayCountry } >Search</button>
            </div>
          </div>
          <img className='world-picture' src={ worldIcon } />
         
        </div>
      </>
    );

    } else {
      return (
        < DisplayCountry 
            goBack={goBack}
            countryInputName={countryName}
        />
      )
    }
}


export default App
