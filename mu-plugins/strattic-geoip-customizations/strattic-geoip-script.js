const stratticGeoIpHandler = {
    userGeo : {},
    stratticGeoIpAPIContent : {},

    init : async () => {
        // Bail early if no divs or stratticGeoIp object.
        if( ! stratticGeoIpHandler.checkForGeoIpDivs() || {} === stratticGeoIpHandler.stratticGeoIpAPIContent ) {
            return;
        }

        await stratticGeoIpHandler.checkCookie();
        await stratticGeoIpHandler.getGeoIpContent();
        await stratticGeoIpHandler.replaceDivs();
        await stratticGeoIpHandler.removeExtraDivs();

        // Remove extra `geoip-targets` divs
        while( 0 < stratticGeoIpHandler.geoIpDivs.length) {
            stratticGeoIpHandler.removeExtraDivs();
        }
    },

    checkForGeoIpDivs : () => {
        stratticGeoIpHandler.geoIpDivs = document.getElementsByClassName('geoip-targets');
        return (stratticGeoIpHandler.geoIpDivs.length > 0)
    },

    getGeoIpContent : async () => {
        const response = await fetch('/wp-json/strattic-geoip/geoip-content/');
        stratticGeoIpHandler.stratticGeoIpAPIContent = await response.json();
    },
    
    getGeoIpLocation : async () => {
        const response = await fetch('https://YOUR-NETLIFY-APP.netlify.app/geolocation');
        stratticGeoIpHandler.userGeo = await response.json();
        // Set the cookie for one day.
        stratticGeoIpHandler.setGeoCookie('geoIpInfo', JSON.stringify(stratticGeoIpHandler.userGeo), 1)
    },

    // Manage GeoIP cookie info
    // Using https://www.w3schools.com/js/js_cookies.asp
    setGeoCookie : (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getGeoCookie : (cname) => {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      
    checkCookie : async () => {
        let geoIp = stratticGeoIpHandler.getGeoCookie("geoIpInfo");

        if (geoIp != "" && geoIp !== undefined & geoIp !== 'undefined') {
            stratticGeoIpHandler.userGeo = JSON.parse(geoIp);
        } else {
            await stratticGeoIpHandler.getGeoIpLocation();
        }
    },

    replaceDivs : () => {
        for( div of stratticGeoIpHandler.geoIpDivs ) {
            if( 'country' in stratticGeoIpHandler.stratticGeoIpAPIContent[div.dataset.id] ) {
                stratticGeoIpHandler.countryDivs(div);
            }
            if( 'not_country' in stratticGeoIpHandler.stratticGeoIpAPIContent[div.dataset.id] ) {
                stratticGeoIpHandler.notCountryDivs(div);            
            }
        }
    },

    countryDivs : (div) => {
        if(stratticGeoIpHandler.stratticGeoIpAPIContent[div.dataset.id]['country'].includes(stratticGeoIpHandler.userGeo.geo.country.code)) {
            div.outerHTML = stratticGeoIpHandler.stratticGeoIpAPIContent[div.dataset.id]['content'];
        }
    },
    
    notCountryDivs : (div) => {
        if(!stratticGeoIpHandler.stratticGeoIpAPIContent[div.dataset.id]['not_country'].includes(stratticGeoIpHandler.userGeo.geo.country.code)) {
            div.outerHTML = stratticGeoIpHandler.stratticGeoIpAPIContent[div.dataset.id]['content'];
        }
    },

    removeExtraDivs : () => {
        for(div of stratticGeoIpHandler.geoIpDivs) {
            div.remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", (event) => { 
    stratticGeoIpHandler.init();
});
