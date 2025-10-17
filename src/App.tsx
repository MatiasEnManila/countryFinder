import { useRef, useState } from 'react';  
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png'
import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

// Intuitive search

function App() {
  
  // USEREF PERSIST BETWEEN RENDERS, IT'LL BE AVAILABLE IN THE NEXT RENDER (AND CHANGES IN YOUR USEREF WONT TRIGGER A NEW RENDER, UNLIKE USESTATE)
  let searchedCountry = useRef('');
  const [countryName, setCountryName] = useState('');
  const [countryInfo, setCountryInfo] = useState({});
  const [frontFace, setFrontFace] = useState(true);
  const [allCountriesNames, setAllCountriesNames] = useState([]);

  
  const handleInputChange = (event: string) => {
    searchedCountry.current = event.target.value.toLowerCase();
    setCountryName(searchedCountry.current);
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


  const getCountryInfo = async () => {


    if (countryName === '') {
      return alert('Please insert a country');
    }


    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      
      if (response.status === 404) {
        return alert('Country not found!');
      }
      
      const data = await response.json();

      setCountryInfo(data[0]);
      setFrontFace(!frontFace);
    } catch (err) {
      console.error("Error! " + err);
    }    
  }
  
 

  const goBack = () => {
    setFrontFace(!frontFace);
    setCountryName('');
  }

  const pressEnterKey = (event) => {
    if (event.key === 'Enter') {
      getCountryInfo();
      event.preventDefault();
    }
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
                onChange={ handleInputChange }
                onKeyDown={ pressEnterKey }
              />
              <button type="button" className='btn btn-dark search-button' onClick={ getCountryInfo } >Search</button>

            </div>
          </div>
          <img className='world-picture' src={ worldIcon } />
         
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
      )
    }
}


export default App
