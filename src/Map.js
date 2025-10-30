import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './Map.css';
function Map({ goBackToDisplay, map, countryInfo }) {
    let flagIcon = countryInfo.flag;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'map-main-div', children: [_jsx("div", { className: 'card-body bg-map', children: _jsx("iframe", { className: 'map-styling', src: map, width: "600", height: "450", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) }), _jsx("h5", { className: "display-1 country-flag", children: flagIcon }), _jsx("button", { className: 'btn btn-success backinfo-btn', onClick: goBackToDisplay, children: "Back to info" })] }) }));
}
export default Map;
