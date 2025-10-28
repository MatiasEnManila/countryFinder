import { useRef, useState } from 'react';
import Select from 'react-select';
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png'
import './App.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  
  const [countryName, setCountryName] = useState('');
  const [frontFace, setFrontFace] = useState(true);
  const [allCountriesNames, setAllCountriesNames] = useState([]);
  

  const getAllCountriesNames = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all?fields=name`);
      const data = await response.json();      
      let selectCountries = []; 
    
      for (let i = 0; i < data.length; i++) {
        selectCountries.push({"value": i, "label": data[i].name.common});
      }

      setAllCountriesNames(selectCountries);
      
    } catch (err) {
      console.error(err);
    }
  }
  
  if (allCountriesNames.length === 0) getAllCountriesNames(); 


  const getDisplayCountry = () => {
    if (countryName === '') {
      return alert('Please insert a country!');
    }
    setFrontFace(!frontFace);
  }


  const goBack = () => {
   setFrontFace(!frontFace);
   setCountryName('');
  }


  const handleSuggestion = (suggestion) => { 
    if (suggestion) {
      setCountryName(suggestion.label); 
      setFrontFace(!frontFace);
     }
  }


  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: '35px',
      minHeight: '35px',
      width: '280px',
      flex: 1
    })
  }


  if (frontFace) {
    return (
      <>
        <div className='frontface-div'>
          <div>
            <h1 className='title bbh-sans-bogle-regular'>Find a country!</h1>
              <div className='select-input'>
                <Select 
                  options={ allCountriesNames }
                  onChange={ handleSuggestion } 
                  placeholder='Search Country'
                  styles={ customStyles }
                />
              </div>
            <button type="button" className='btn btn-dark search-button' onClick={ getDisplayCountry }>Search</button>
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
