var ES6Promise = require('es6-promise').Promise;

// Create the XHR object.
function createCORSRequest(method, url) {
    //console.info('createCORSRequest');
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
// function getTitle(text) {
//     return text.match('<title>(.*)?</title>')[1];
// }

// Make the actual CORS request.
// function makeCorsRequest() {
//     // All HTML5 Rocks properties support CORS.
//     var url = 'http://updates.html5rocks.com';
//
//     var xhr = createCORSRequest('GET', url);
//     if (!xhr) {
//         alert('CORS not supported');
//         return;
//     }
//
//     // Response handlers.
//     xhr.onload = function() {
//         var text = xhr.responseText;
//         var title = getTitle(text);
//         alert('Response from CORS request to ' + url + ': ' + title);
//     };
//
//     xhr.onerror = function() {
//         alert('Woops, there was an error making the request.');
//     };
//
//     xhr.send();
// }

var getJSON = function (url) {
    //console.info('getJSON', url);
    var promise = new ES6Promise(function (resolve, reject) {
        // var client = new XMLHttpRequest();

        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            reject(Error('CORS not supported'));
            return;
        }

        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-store, no-cache");
        // Response handlers.
        xhr.onreadystatechange = handler;

        xhr.onerror = function() {
            reject(Error('network error'));
        };

        xhr.send();

        // client.open("GET", url);
        // client.onreadystatechange = handler;
        // client.responseType = "json";
        // client.setRequestHeader("Accept", "application/json");
        // client.setRequestHeader("Cache-Control", "no-store, no-cache");
        // client.onerror = function() {
        //     reject(Error('network error'));
        // }
        // client.send();

        function handler() {
            if (this.readyState === this.DONE) {
                //console.info('done', this);
                switch (this.status) {
                    case 200:
                    //console.info('success', this.response);

                    break;
                    case 502:
                    //console.error('It\'s likely Django application is  not running');
                    // reject(Error(this.statusText));
                    break;
                    case 500:
                    //console.error('System error');
                    // reject(Error(this.statusText));
                    // throw new Error('system err');
                    break;
                    default:
                    //console.error('some other error');
                }
                resolve(this);
            }
        };
    });

    return promise;
};

module.exports = {
    // fetchArticleById: function (id) {
    //     return getJSON('/api/article/' + id);
    // },
    // fetchArticles: function () {
    //     return getJSON('http://cms.asiafinance.me/api/articles');
    // },
    fetchHeaderMenu: function() {
        return getJSON('/cms-api/menus/1/');
    },
    fetch(url) {
        return getJSON(url);
    },
};
