import { useState } from 'react';
import './DisplayCountry.css';
import Map from './Map';


function DisplayCountry({ countryInfo, goBack, countryInputName} : object ) {
  
  const [isItDisplayCountry, setIsItDisplayCountry] = useState(true);

  let apiKey = import.meta.env.VITE_API_SECRET
  let countryMap = `https://www.google.com/maps/embed/v1/place?${apiKey}q=${countryInputName}`
  

  const seeMap = () => {
    setIsItDisplayCountry(!isItDisplayCountry);
  }


  let countryName = countryInfo[0].name.official;
  let coatOfArms = countryInfo[0].coatOfArms.svg;
  let capitalCity = countryInfo[0].capital;
  
  let officialLanguages = '';
  // ITERATE THROUGH PROPERTIES BY CHECKING LENGTH OF KEYS
  for (let i = 0; i < Object.keys(countryInfo[0].languages).length; i++) {
    officialLanguages += " " + Object.values(countryInfo[0].languages)[i];
  }
  
  let population = countryInfo[0].population;
  let demonyms = Object.values(countryInfo[0].demonyms)[0].m;
  let currencies = Object.values(countryInfo[0].currencies)[0].name;
  let timezones = countryInfo[0].timezones[0];
  let subRegion = countryInfo[0].subregion; 


  // Indenpendent vs non-independent states
  let duplicateNation = countryInfo[0].name.common === 'Macau' || countryInfo[0].name.common === 'South Georgia';
  

  // NIGER VS NIGERIA
  if (countryInputName === 'niger') {
    countryName = countryInfo[1].name.official;
    coatOfArms = countryInfo[1].coatOfArms.svg;
    capitalCity = countryInfo[1].capital;
  
    officialLanguages = '';
    for (let i = 1; i < Object.keys(countryInfo[1].languages).length; i++) {
      officialLanguages += " " + Object.values(countryInfo[1].languages)[i];
    }
  
    population = countryInfo[1].population;
    demonyms = Object.values(countryInfo[1].demonyms)[0].m;
    currencies = Object.values(countryInfo[1].currencies)[0].name;
    timezones = countryInfo[1].timezones[0];
    subRegion = countryInfo[1].subregion; 
  }

    
  if (isItDisplayCountry) {
    return (  
      <>
        <div className='display-container'>
          <div>
            <img className='svg' src={duplicateNation ? countryInfo[1].coatOfArms.svg : coatOfArms} />
          </div>
          <div className='country-name'>
            <h1 className='text-props fs-3'><b>{duplicateNation ? countryInfo[1].name.official : countryName}</b></h1>
          </div>
  
          {/* A COUNTRY STATS */}
          <div className='info-container'>
            <li><b>Capital city: </b><span className='info-italic'>{duplicateNation ? countryInfo[1].capital : capitalCity }</span></li>
            <li><b>Official languages: </b><span className='info-italic'>{duplicateNation ? Object.values(countryInfo[1].languages)[0] : officialLanguages}</span></li>
            <li><b>Population: </b><span className='info-italic'>{duplicateNation ? countryInfo[1].population : population }</span></li>
            <li><b>Demonym: </b><span className='info-italic'>{duplicateNation ? Object.values(countryInfo[1].demonyms)[0].m : demonyms }</span></li>
            <li><b>Currency:</b> <span className='info-italic'>{duplicateNation ? Object.values(countryInfo[1].currencies)[0].name : currencies }</span></li>
            <li><b>Timezone: </b><span className='info-italic'>{duplicateNation ? countryInfo[1].timezones : timezones }</span></li>
            <li><b>Subregion: </b><span className='info-italic'>{duplicateNation ? countryInfo[1].subregion : subRegion }</span></li>
          </div>
          
          <div className='goback-btn'>
            <button className='btn btn-dark' onClick={goBack}>Go back</button>
            <button className='btn btn-primary see-map' onClick={seeMap}>See map</button>
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