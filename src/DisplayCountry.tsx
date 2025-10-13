import { useState } from 'react';
import './DisplayCountry.css';
import Map from './Map';


function DisplayCountry({ countryInfo, goBack, countryInputName } : object ) {
  
  const [isItDisplayCountry, setIsItDisplayCountry] = useState(true);

  let apiKey = import.meta.env.VITE_API_SECRET
  let countryMap = `https://www.google.com/maps/embed/v1/place?${apiKey}q=${countryInputName}`;
  

  const seeMap = () => {
    setIsItDisplayCountry(!isItDisplayCountry);
  }

  let countryName = countryInfo[0].name.official;
  let coatOfArms = countryInfo[0].coatOfArms.png;
  let capitalCity = countryInfo[0].capital;
  
  // ITERATE THROUGH PROPERTIES BY CHECKING LENGTH OF KEYS
  let officialLanguages = '';
  for (let i = 0; i < Object.keys(countryInfo[0].languages).length; i++) {
    officialLanguages += " " + Object.values(countryInfo[0].languages)[i];
  }
  
  let population = countryInfo[0].population;
  let demonyms = Object.values(countryInfo[0].demonyms)[0].m;
  let currencies = Object.values(countryInfo[0].currencies)[0].name;
  let timezones = countryInfo[0].timezones[0];
  let subRegion = countryInfo[0].subregion; 
    

  if (isItDisplayCountry) {
    return (  
      <>
        <div className='display-container'>
          <div>
            {/* <img className='svg' src={loading ? "loadingImage" : coatOfArms)} /> */}
            <img className='svg' src={ coatOfArms } />
          </div>
          <div className='country-name'>
            <h1 className='text-props fs-3'><b>{ countryName }</b></h1>
          </div>
      
          {/* COUNTRY STATS */}
          <div className='info-container'>
            <li><b>Capital city: </b><span className='info-italic'>{ capitalCity }</span></li>
            <li><b>Official languages: </b><span className='info-italic'>{ officialLanguages }</span></li>
            <li><b>Population: </b><span className='info-italic'>{ population }</span></li>
            <li><b>Demonym: </b><span className='info-italic'>{ demonyms }</span></li>
            <li><b>Currency:</b> <span className='info-italic'>{ currencies }</span></li>
            <li><b>Timezone: </b><span className='info-italic'>{ timezones }</span></li>
            <li><b>Subregion: </b><span className='info-italic'>{ subRegion }</span></li>
          </div>
          
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
        countryName={countryInputName}
        countryInfo={countryInfo}
      />
    )
  }
} 

export default DisplayCountry;