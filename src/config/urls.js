// import qs from "query-string";
// const query = qs.parseUrl(window.location.href);

// API URL to be used based on environment
let domainName;
let socketDomainName;
let isStandalone = false;

isStandalone = window.navigator.userAgent.indexOf("Electron/") > -1;

if (isStandalone) {
    domainName = "http://localhost:9093/api/v1";
    
    //domainName = "https://developer-workboard-dev.cisco.com/api/v2";
    socketDomainName = "http://localhost:9093";
} else {
    if (
        process.env.REACT_APP_ENV === "dev" ||
        process.env.NODE_ENV !== "production"
    ) {
        domainName = "http://localhost:9093/api/v1";
        domainName="https://onedemoserver.onrender.com/api/v1"
        //domainName = "https://developer-workboard-dev.cisco.com/api/v2";
        socketDomainName = "http://localhost:9093";
    } else {
        // domainName =
        //     query.url.split("/")[0] +
        //     "//" +
        //     query.url.split("/")[2] +
        //     "/api/v1";
            domainName="https://onedemoserver.onrender.com/api/v1"
        // socketDomainName =
        //     query.url.split("/")[0] +
        //     "//" +
        //     query.url.split("/")[2];
            socketDomainName="https://onedemoserver.onrender.com"
    }
}



export { domainName, socketDomainName };
