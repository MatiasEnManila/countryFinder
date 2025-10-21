import { useEffect, useState } from 'react';
import { BounceLoader } from "react-spinners"; 
import './DisplayCountry.css';
import Map from './Map';


function DisplayCountry({ goBack, countryInputName } : object | string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isItDisplayCountry, setIsItDisplayCountry] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null);

  // Validating properties
  const [isCoat, setIsCoat] = useState(0);
  const [isCapital, setIsCapital] = useState(0);
  const [isPopulation, setIsPopulation] = useState(0);
  const [isDemonym, setIsDemonym] = useState(0);
  const [isCurrency, setIsCurrency] = useState(0);
  const [isLanguages, setIsLanguages] = useState(0);
  const [isSubregion, setIsSubregion] = useState(0);


  const apiKey = import.meta.env.VITE_API_SECRET
  const countryMap = `https://www.google.com/maps/embed/v1/place?${apiKey}q=${countryInputName}`;


  const getCountryInfo = async () => {
    try {

      const response = await fetch(`https://restcountries.com/v3.1/name/${countryInputName}?fullText=true`);
      
      if (response.status === 404) {
         alert('Country not found!');
         return goBack();
      }
      
      const data = await response.json();
      setCountryInfo(data[0]);
      setIsCoat(Object.values(data[0].coatOfArms).length);

      setIsCapital(Object.values(data[0].capital).length);
      setIsPopulation(data[0].population);
      setIsDemonym(Object.values(data[0].demonyms).length);
      setIsCurrency(Object.values(data[0].currencies).length);
      setIsLanguages(Object.values(data[0].languages).length);

      if (data[0].subRegion) {
        setIsSubregion(data[0].subRegion.length);
      } else {
        setIsSubregion(data[0].subregion.length);
      }

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
    // ITERATE THROUGH PROPERTIES BY CHECKING LENGTH OF KEYS
    for (let i = 0; i < Object.keys(countryInfo.languages).length; i++) {
      officialLanguages += " " + Object.values(countryInfo.languages)[i];
      }
      return officialLanguages
  }
      
      
      
    if (isItDisplayCountry) {
        return (  
          <>
        <div className='display-container'>
          { countryInfo && 
            <>
              { isCoat > 0 &&
                <>
                  <div style={{ display:isLoading ? 'block' : 'none' }}>
                    <BounceLoader color={"#123443"} size={150} aria-label="Loading Spinner" data-testid="loader"/>
                  </div>
                  <div style={{ display:isLoading ? 'none' : 'block' }}>
                    <img className='svg' onLoad={() => isLoading && setIsLoading(false)} src={ countryInfo.coatOfArms.png } />
                  </div>
                </>
              }

              <div className='country-name'>
                <h1 className='text-props fs-3'><b>{ countryInfo.name.official }</b></h1>
              </div>
          


              <div className='info-container'>
                { isCapital > 0 && <li><b>Capital city: </b><span className='info-italic'>{ countryInfo.capital }</span></li> }
                { isPopulation > 0 && <li><b>Population: </b><span className='info-italic'>{ countryInfo.population }</span></li> }
                { isDemonym > 0 && <li><b>Demonym: </b><span className='info-italic'>{ Object.values(countryInfo.demonyms)[0].m }</span></li> }
                { isLanguages > 0 && <li><b>Official languages: </b><span className='info-italic'>{ getOfficialLanguages(countryInfo) }</span></li> }
                { isCurrency > 0 && <li><b>Currency:</b> <span className='info-italic'>{ Object.values(countryInfo.currencies)[0].name }</span></li> }
                <li><b>Timezone: </b><span className='info-italic'>{ countryInfo.timezones[0] }</span></li>
                { isSubregion > 0 && <li><b>Subregion: </b><span className='info-italic'>{ countryInfo.subregion || countryInfo.subRegion }</span></li> }
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