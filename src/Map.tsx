import './Map.css';


function Map( {goBackToDisplay, map, countryName, countryInfo} ) {

  let flagIcon = countryInfo[0].flag;
  let changeFlags = countryName === 'niger' || countryName === 'china' || countryName === 'georgia';

  if (changeFlags) {
    flagIcon = countryInfo[1].flag;
  }
  
  // let upperCaseCountry = countryName.charAt(0).toUpperCase() + countryName.slice(1);
    
  return (
    <>
      <div className='map-main-div'>
        <div className='card-body bg-map'>
          <iframe
              className='map-styling'
              src={map}
              width="600" height="450" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        
          <h5 className="display-1 country-flag">{flagIcon}</h5>
          <button className='btn btn-success backinfo-btn' onClick={goBackToDisplay}>Back to info</button>  
      </div>
    </>     

  );
}

export default Map;