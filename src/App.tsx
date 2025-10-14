import { useRef, useState } from 'react';  
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png'
import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

// Intuitive search
// no coat of arms (i.e eswatini) === undefined (re-arrange CSS?)
// Caching/ saving locally - reactjs
// how to loading image html -- reactjs? 

function App() {
  
  // USEREF PERSIST BETWEEN RENDERS, IT'LL BE AVAILABLE IN THE NEXT RENDER (AND CHANGES IN YOUR USEREF WONT TRIGGER A NEW RENDER, UNLIKE USESTATE)
  let searchedCountry = useRef('');
  const [countryName, setCountryName] = useState('')
  const [countryInfo, setCountryInfo] = useState({});
  const [frontFace, setFrontFace] = useState(true);
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  // const [svgStatus, setSvgStatus] = useState(false);

  
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

  function handleClick() {
    // setLoading(true);
    
    if (countryName === '') {
      return alert('Please insert a country');
    }
    
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => 
      res.json()
    ) 
    .then(data => {
      // console.log(data.status);
      if (data.status === 404) {
        return alert('Country not found!');
      }
      // setSvgStatus(true);
      setCountryInfo(data[0]);
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

  const pressEnterKey = (event) => {
    if (event.key === 'Enter') {
      handleClick();
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
              <button type="button" className='btn btn-dark search-button' onClick={handleClick} >Search</button>

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
          // svgStatus={svgStatus}
        />
      )
    }
}


export default App
