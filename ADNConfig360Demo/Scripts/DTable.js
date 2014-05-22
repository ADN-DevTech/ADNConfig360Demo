var global = {};
global.settings = {
    materialjson: "",
    C360Viewer: null
};

(function (window) {
$(document).ready(function () {
 

    function processData(data) { 
        
        var materialDB = $('#tbMaterial').dynatable({
            dataset: {
                records: data
            },
            table: {
                defaultColumnIdStyle: 'trimDash'
            }
        }).data('dynatable');
    }

    function createCORSRequest(method, url) {
          var myxhr = new XMLHttpRequest();
          if ("withCredentials" in myxhr) {

             
            myxhr.open(method, url, true);

          } else if (typeof XDomainRequest != "undefined") {

           
            myxhr = new XDomainRequest();
            myxhr.open(method, url);

          } else { 
          
            myxhr = null;

          }
          return myxhr;
        }


      var url = "http://lxdconfigmsrv.cloudapp.net/Service1.svc/rest/getlxdm";
      var xhr = createCORSRequest('GET', url);
        if (!xhr) {
           alert("CORS not supported");
        }

    // Use Microsoft XDR
    //var xdr = new XDomainRequest();
    //xdr.open("get", "http://lxdconfigmsrv.cloudapp.net/Service1.svc/rest/getlxdm");
   
    xhr.onload = function () {
        //parse response as JSON
        var JSON = $.parseJSON(xhr.responseText);
        if (JSON == null || typeof (JSON) == 'undefined') {
            JSON = $.parseJSON(data.firstChild.textContent);
        }
        global.settings.materialjson = JSON;
     
        processData(JSON);
    };

    xhr.onerror = function () {
        alert("an error to access web service of material!");
    };

    xhr.send();
});

} (this)); 