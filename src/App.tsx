import { useEffect, useRef, useState } from 'react';
import './App.css'
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

// APIKEY SECRET
// Coat of arms won't load well (coat of arm - FETCH FOR COATS)
// animacion loading **
// html dropdown list, autofill



function App() {
  
  // USEREF PERSIST BETWEEN RENDERS, IT'LL BE AVAILABLE IN THE NEXT RENDER (AND CHANGES IN YOUR USEREF WONT TRIGGER A NEW RENDER, UNLIKE USESTATE)
  let searchedCountry = useRef('');
  const [countryName, setCountryName] = useState('')
  const [countryInfo, setCountryInfo] = useState({});
  const [frontFace, setFrontFace] = useState(true);
  const [allCountriesNames, setAllCountriesNames] = useState([]);


  const handleInputChange = (event: string) => {
    searchedCountry.current = event.target.value.toLowerCase();
    setCountryName(searchedCountry.current);
  }



  // ARRAY WITH ALL COUNTRIES AVAILABLE WITH THIS API
  
  const getAllCountriesNames = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all?fields=name`);
      const data = await response.json();
      return setAllCountriesNames(data.map(country => country.name.common).sort());	
    } catch (err) {
      console.log("nihao");
      console.error(err);
    }
  }
  
  // getAllCountriesNames().then(countries => setAllCountriesNames(countries));
  if (allCountriesNames.length === 0) getAllCountriesNames();

  
  
  function handleClick() {
    
    if (countryName === '') {
      return alert('Please insert a country');
    }
    
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 404) {
        return alert('Country not found!');
      }
      setCountryInfo(data);
      setFrontFace(!frontFace);
    })
    .catch(err => { 
      console.log("ERROR :", err);
      setFrontFace(frontFace);
    });
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
            
            <h1 className='title fw-medium text-center'>Country finder</h1>
            <div>
              <input
                className='input'
                type="text"
                placeholder="Search country"
                onChange={handleInputChange}
              />
              <button type="button" className='btn btn-dark search-button' onClick={handleClick}>Search</button>

            </div>
          </div>
          
          <img className='world-picture' src={worldIcon} />
        </div>
      </>
    );
  } else {
      return (
        < DisplayCountry 
          countryInfo={countryInfo}
          goBack={goBack}
          countryInputName={countryName}
        />
      );
    }
} 



export default App
