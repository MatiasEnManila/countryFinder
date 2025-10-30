import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Select from 'react-select';
import DisplayCountry from './DisplayCountry';
import worldIcon from './pictures/hello-world2.png';
import './App.css';
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
                selectCountries.push({ "value": i, "label": data[i].name.common });
            }
            setAllCountriesNames(selectCountries);
        }
        catch (err) {
            console.error(err);
        }
    };
    if (allCountriesNames.length === 0)
        getAllCountriesNames();
    const getDisplayCountry = () => {
        if (countryName === '') {
            return alert('Please insert a country!');
        }
        setFrontFace(!frontFace);
    };
    const goBack = () => {
        setFrontFace(!frontFace);
        setCountryName('');
    };
    const handleSuggestion = (suggestion) => {
        if (suggestion) {
            setCountryName(suggestion.label);
            setFrontFace(!frontFace);
        }
    };
    const mediaQueryString800px = 'min-width: 800px';
    const mq800px = window.matchMedia(mediaQueryString800px);
    const mediaQuery = () => {
        if (mq800px.matches) {
            const customStyles = {
                control: (base, state) => ({
                    ...base,
                    height: '35px',
                    minHeight: '35px',
                    width: '280px',
                    flex: 1
                })
            };
        }
        else {
            const customMq800 = {
                control: (base, state) => ({
                    ...base,
                    width: '25rem',
                    // minHeight: '20rem'
                })
            };
        }
    };
    if (frontFace) {
        return (_jsx(_Fragment, { children: _jsxs("div", { className: 'frontface-div', children: [_jsxs("div", { children: [_jsx("h1", { className: 'title bbh-sans-bogle-regular', children: "Find a country!" }), _jsx("div", { className: 'select-input', children: _jsx(Select, { options: allCountriesNames, onChange: handleSuggestion, placeholder: 'Search Country', styles: mediaQuery }) }), _jsx("button", { type: "button", className: 'btn btn-dark search-button', onClick: getDisplayCountry, children: "Search" })] }), _jsx("img", { className: 'world-picture', src: worldIcon })] }) }));
    }
    else {
        return (_jsx(DisplayCountry, { goBack: goBack, countryInputName: countryName }));
    }
}
export default App;
