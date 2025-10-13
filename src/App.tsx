import { useRef, useState } from 'react';
import { BounceLoader } from "react-spinners";  
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png'
import loadingIcon from './pictures/loading-icon.png'
import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";


// Pre-load svg - coat of arms won't load well
// Intuitive search 
// Eswatini coat of arms === undefined (re-arrange CSS?)
// Caching/ saving locally - reactjs
// how to loading image hhtml -- reactjs? 

function App() {
  
  // USEREF PERSIST BETWEEN RENDERS, IT'LL BE AVAILABLE IN THE NEXT RENDER (AND CHANGES IN YOUR USEREF WONT TRIGGER A NEW RENDER, UNLIKE USESTATE)
  let searchedCountry = useRef('');
  const [countryName, setCountryName] = useState('')
  const [countryInfo, setCountryInfo] = useState({});
  const [frontFace, setFrontFace] = useState(true);
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [svgContent, setSvgContent] = useState(null);


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

// https://restcountries.com/v3.1/name/georgia?fullText=true

  function handleClick() {
    // setLoading(true);
    
    if (countryName === '') {
      return alert('Please insert a country');
    }
    
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(data => {
  
      console.log(data);
      if (data.status === 404) {
        return alert('Country not found!');
      }
      setCountryInfo(data);
      setFrontFace(!frontFace);
      setSvgContent(data[0].coatOfArms.png)
    })
    .catch(err => { 
      console.log("ERROR :", err);
      setFrontFace(frontFace);
    });

    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
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
  
      if (loading) {
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
              <div className='loading-icon'>

                <BounceLoader 
                  color={"#db9541ff"}
                  loading={loading}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />

                <p className='loading-text'>Loading...</p>

              </div>
              <img className='loading-picture' src={loadingIcon} />

            </div>
          </div>
        </>
        )
      } else {
        return (
          < DisplayCountry 
            countryInfo={countryInfo}
            goBack={goBack}
            countryInputName={countryName}
            svgContent={svgContent}
          />
        )
      }
    }
} 



export default App
