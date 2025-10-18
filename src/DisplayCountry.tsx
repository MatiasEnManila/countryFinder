import { useEffect, useState } from 'react';
import { BounceLoader } from "react-spinners"; 
import './DisplayCountry.css';
import Map from './Map';


function DisplayCountry({ goBack, countryInputName } : object | string) {

  const [isLoading, setIsLoading] = useState(true);
  const [isItDisplayCountry, setIsItDisplayCountry] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null);
  
  const apiKey = import.meta.env.VITE_API_SECRET
  const countryMap = `https://www.google.com/maps/embed/v1/place?${apiKey}q=${countryInputName}`;


  const getCountryInfo = async () => {
    try {

      const response = await fetch(`https://restcountries.com/v3.1/name/${countryInputName}?fullText=true`);
      
      if (response.status === 404) {
        return alert('Country not found!');
      }
      
      const data = await response.json();
      setCountryInfo(data[0]);
    } catch (err) {
        console.error("Error! " + err);
      }    
}



// it only runs once -  when the component mounts, and cleans up when it unmounts.
  useEffect(() => {
    getCountryInfo();

    const handleKeyDown = (event) => {
      if (event.key === 'Backspace' || event.keyCode === 8) {
        goBack();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, []);


 
 
  const seeMap = () => {
    setIsItDisplayCountry(!isItDisplayCountry);
  }

  

  const getOfficialLanguages = (countryInfo) => {
    let officialLanguages = '';
    for (let i = 0; i < Object.keys(countryInfo.languages).length; i++) {
      officialLanguages += " " + Object.values(countryInfo.languages)[i];
    }
    return officialLanguages
  }
  // ITERATE THROUGH PROPERTIES BY CHECKING LENGTH OF KEYS

  if (isItDisplayCountry) {

    return (  
      <>
        <div className='display-container'>
          { countryInfo && 
            <>
              <div style={{ display:isLoading ? 'block' : 'none' }}>
                <BounceLoader color={"#123443"} size={150} aria-label="Loading Spinner" data-testid="loader"/>
              </div>
              <div style={{ display:isLoading ? 'none' : 'block' }}>
                <img onLoad={() => isLoading && setIsLoading(false)} src={ countryInfo.coatOfArms.svg } className='svg' />
              </div>
              <div className='country-name'>
                <h1 className='text-props fs-3'><b>{ countryInfo.name.official }</b></h1>
              </div>
          
              <div className='info-container'>
                <li><b>Capital city: </b><span className='info-italic'>{ countryInfo.capital }</span></li>
                <li><b>Official languages: </b><span className='info-italic'>{ getOfficialLanguages(countryInfo) }</span></li>
                <li><b>Population: </b><span className='info-italic'>{ countryInfo.population }</span></li>
                <li><b>Demonym: </b><span className='info-italic'>{ Object.values(countryInfo.demonyms)[0].m }</span></li>
                <li><b>Currency:</b> <span className='info-italic'>{ Object.values(countryInfo.currencies)[0].name }</span></li>
                <li><b>Timezone: </b><span className='info-italic'>{ countryInfo.timezones[0] }</span></li>
                <li><b>Subregion: </b><span className='info-italic'>{ countryInfo.subRegion }</span></li>
              </div>
            </>
          }
          <div className='goback-btn'>
            <button className='btn btn-dark' onClick={ goBack }>Go back</button>
            <button className='btn btn-primary see-map' onClick={ seeMap }>See map</button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Map 
        goBackToDisplay={seeMap}
        map={countryMap}
        countryInfo={countryInfo}
      />
    )
  }
} 

export default DisplayCountry;