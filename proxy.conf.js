const PROXY_CONFIG = {
  "/welcome": {
      "target": "http://localhost:8080/",
      "secure": false,
      "logLevel": "debug"
  }
  ,
  "/saml": {
      "target": "http://localhost:8080/welcome",
      "secure": false,
      "logLevel": "debug",
      "onProxyRes": function (proxyRes, req, res) {
          if (proxyRes.headers['location']) {
              proxyRes.headers['location'] = "http://localhost:4200";
          }
      }
  }
}

module.exports = PROXY_CONFIG;
