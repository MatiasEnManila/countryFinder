import { useEffect, useState } from 'react';
import { BounceLoader } from "react-spinners"; 
import './DisplayCountry.css';
import Map from './Map';


function DisplayCountry({ countryInfo, goBack, countryInputName } : object ) {

  const [isItDisplayCountry, setIsItDisplayCountry] = useState(true);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_API_SECRET
  const countryMap = `https://www.google.com/maps/embed/v1/place?${apiKey}q=${countryInputName}`;

  
// it only runs  once when the component mounts and cleans up when it unmounts.
 useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace' || event.keyCode === 8) {
        console.log("testing");
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
  
  // console.log(svgStatus);
  // const getSvg = async () => {
  //   try {
  //     const response = await fetch(`https://restcountries.com/v3.1/name/${countryInputName}?fullText=true`);
  //     const data = await response.json();
  //     const svg = data[0].coatOfArms.svg;
      
  //     if (data.status === 200) {
  //      return console.log("nihao");
  //     }

  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  
  // getSvg();

  const countryName = countryInfo.name.official;
  const coatOfArms = countryInfo.coatOfArms.svg;
  const capitalCity = countryInfo.capital;
  
  // ITERATE THROUGH PROPERTIES BY CHECKING LENGTH OF KEYS
  let officialLanguages = '';
  for (let i = 0; i < Object.keys(countryInfo.languages).length; i++) {
    officialLanguages += " " + Object.values(countryInfo.languages)[i];
  }
  
  const population = countryInfo.population;
  const demonyms = Object.values(countryInfo.demonyms)[0].m;
  const currencies = Object.values(countryInfo.currencies)[0].name;
  const timezones = countryInfo.timezones[0];
  const subRegion = countryInfo.subregion; 

  // PSEUDO CODE: IF STATUS.LOAD === TRUE :
    

  if (isItDisplayCountry) {
    return (  
      <>
        <div className='display-container'>
          <div>
            <img className='svg' 
                 src={ loading ?
                  <BounceLoader
                    color={"#123443"}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  : 
                  coatOfArms } 
            />

          </div>
          <div className='country-name'>
            <h1 className='text-props fs-3'><b>{ countryName }</b></h1>
          </div>
      
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