import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BounceLoader } from "react-spinners";
import './DisplayCountry.css';
import Map from './Map';
function DisplayCountry({ goBack, countryInputName }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isItDisplayCountry, setIsItDisplayCountry] = useState(true);
    const [countryInfo, setCountryInfo] = useState(null);
    const [isCoat, setIsCoat] = useState(0);
    const [isCapital, setIsCapital] = useState(0);
    const [isPopulation, setIsPopulation] = useState(0);
    const [isDemonym, setIsDemonym] = useState(0);
    const [isCurrency, setIsCurrency] = useState(0);
    const [isLanguages, setIsLanguages] = useState(0);
    const [isSubregion, setIsSubregion] = useState(0);
    const apiKey = import.meta.env.VITE_API_SECRET;
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
            }
            else {
                setIsSubregion(data[0].subregion.length);
            }
        }
        catch (err) {
            console.error("Error! " + err);
        }
    };
    // it only runs once, when the component mounts, and cleans up when it unmounts.
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
        };
    }, []);
    const seeMap = () => {
        setIsItDisplayCountry(!isItDisplayCountry);
    };
    const getOfficialLanguages = (countryInfo) => {
        let officialLanguages = '';
        // ITERATE THROUGH PROPERTIES BY CHECKING LENGTH OF KEYS
        for (let i = 0; i < Object.keys(countryInfo.languages).length; i++) {
            officialLanguages += " " + Object.values(countryInfo.languages)[i];
        }
        return officialLanguages;
    };
    if (isItDisplayCountry) {
        return (_jsx(_Fragment, { children: _jsx("div", { className: 'display-container', children: _jsxs("div", { className: 'no-coat-placement', style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [countryInfo &&
                            _jsx(_Fragment, { children: isCoat > 0 ?
                                    _jsxs(_Fragment, { children: [_jsx(BounceLoader, { color: "#123443", size: 150, "aria-label": "Loading Spinner", cssOverride: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, loading: isLoading }), _jsx("div", { style: { display: isLoading ? 'none' : 'block' }, children: _jsx("img", { className: 'svg', onLoad: () => isLoading && setIsLoading(false), src: countryInfo.coatOfArms.png }) }), _jsx("h1", { className: 'country-title rubik-title', children: _jsx("b", { className: 'country-font', children: countryInfo.name.official }) }), _jsxs("div", { className: 'info-container', children: [isCapital > 0 && _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Capital city: " }), _jsx("span", { className: 'info-italic', children: countryInfo.capital })] }), isPopulation > 0 && _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Population: " }), _jsx("span", { className: 'info-italic', children: countryInfo.population })] }), isDemonym > 0 && _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Demonym: " }), _jsx("span", { className: 'info-italic', children: Object.values(countryInfo.demonyms)[0].m })] }), isLanguages > 0 && _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Official languages: " }), _jsx("span", { className: 'info-italic', children: getOfficialLanguages(countryInfo) })] }), isCurrency > 0 && _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Currency: " }), _jsx("span", { className: 'info-italic', children: Object.values(countryInfo.currencies)[0].name })] }), _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Timezone: " }), _jsx("span", { className: 'info-italic', children: countryInfo.timezones[0] })] }), _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Region: " }), _jsx("span", { className: 'info-italic', children: countryInfo.region })] }), isSubregion > 0 && _jsxs("li", { className: 'stats-placement', children: [_jsx("b", { children: "Subregion: " }), _jsx("span", { className: 'info-italic', children: countryInfo.subregion || countryInfo.subRegion })] })] })] })
                                    :
                                        _jsxs(_Fragment, { children: [_jsx("h1", { className: 'no-coat rubik-title', children: _jsx("b", { className: 'country-font-no-coat', children: countryInfo.name.official }) }), _jsxs("div", { className: 'info-container-no-coat', children: [isCapital > 0 && _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Capital city: " }), _jsx("span", { className: 'info-italic', children: countryInfo.capital })] }), isPopulation > 0 && _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Population: " }), _jsx("span", { className: 'info-italic', children: countryInfo.population })] }), isDemonym > 0 && _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Demonym: " }), _jsx("span", { className: 'info-italic', children: Object.values(countryInfo.demonyms)[0].m })] }), isLanguages > 0 && _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Official languages: " }), _jsx("span", { className: 'info-italic', children: getOfficialLanguages(countryInfo) })] }), isCurrency > 0 && _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Currency: " }), _jsx("span", { className: 'info-italic', children: Object.values(countryInfo.currencies)[0].name })] }), _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Timezone: " }), _jsx("span", { className: 'info-italic', children: countryInfo.timezones[0] })] }), _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Region: " }), _jsx("span", { className: 'info-italic', children: countryInfo.region })] }), isSubregion > 0 && _jsxs("li", { className: 'stats-placement-no-coat', children: [_jsx("b", { children: "Subregion: " }), _jsx("span", { className: 'info-italic', children: countryInfo.subregion || countryInfo.subRegion })] })] })] }) }), _jsxs("div", { className: 'buttons', children: [_jsx("button", { className: 'btn btn-dark go-back-btn', onClick: goBack, children: "Go back" }), _jsx("button", { className: 'btn btn-primary see-map', onClick: seeMap, children: "See map" })] })] }) }) }));
    }
    else {
        return (_jsx(Map, { goBackToDisplay: seeMap, map: countryMap, countryInfo: countryInfo }));
    }
}
export default DisplayCountry;
