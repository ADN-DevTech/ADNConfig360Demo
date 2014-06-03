(function (window) {

    "use strict";
    var C360 = window.ADSK && window.ADSK.C360;

    var C360Viewer;
    var jsonResult;

    window.onbeforeunload = function () {
        if (C360Viewer)
            C360Viewer.unload(); // Unload the C360Viewer
    }
    // callback for getPropertyValues.
    function listProperties(result) {
        window.console.log(window.JSON.stringify(result, null, '  '));
    }

    // success handler
    function viewerLoaded(viewer) {
        // The C360Viewer is loaded, do something with it.
        viewer.getPropertyValues(null, listProperties);
        C360Viewer = viewer;
        global.settings.C360Viewer = viewer;
    }

    // error handler
    function failedToLoad(viewer) {
        window.alert('The viewer failed to load for some reason. Please refesh the webpage');
        viewer.unload(); // Unload the C360Viewer
    }

    function loadModel(modelName) {

        // Check if the API was loaded.
        // load the first model
        if (C360) { // Not supported on mobile devices currently.

            var guid;
            if (modelName == "Tuner") {
                guid = "38879945991951030/lzdj4dweeqv1";
            }

            if (modelName == "SimpleTest") {
                guid = "38879945991951030/d2g2bmfhdt4r";
            }

            var showpanes = {
                branding: false,
                parameters: true,
                model: true,
                actions: false,
                message: false
            };

            // Initialize the viewer
            C360.initViewer({
                container: "myViewer",
                design: guid,
                panes: showpanes,
                success: viewerLoaded, // Set success handler
                error: failedToLoad // Set error handler
            });
        }
        else {
            alert("C360 is null!");
        }
    }

    loadModel("SimpleTest");


    $("#SetProp").click(function () {
       
        var cit = $("#ConfigProTB"); 

        if (C360Viewer != null && cit.size() > 0) {
            var jsonSet = "{";
           
            $("#ConfigProTB tbody tr").each(function (trindex, tritem) {                  
                $(tritem).find("td").each(function (tdindex) {                   
                    if (tdindex == 0) {
                        if (trindex > 1)
                            jsonSet = jsonSet + ",";
                        jsonSet = jsonSet + $(this).text();
                    }
                    if (tdindex == 1) {
                        var textVal = $(this).find("input[type='text']").val();
                        jsonSet = jsonSet + ":" + textVal;
                    }  
                });
            });

            jsonSet = jsonSet + "}";
            var finalJson = eval("(" + jsonSet + ")");

            C360Viewer.setPropertyValues(finalJson);
           
        }
    });

    function SetPropjsonResult(result) {

        //backup
    }



    $("#GetProp").click(function () {
        if(C360Viewer!=null)
          C360Viewer.getPropertyValues(null, GetPropjsonResult);
    }); 

    function GetPropjsonResult(result) {

        var cit = $("#ConfigProTB tbody");
        if (cit.size() > 0) {
            cit.find("tr:not(:first)").remove();
        }

        var PropJsonResp = window.JSON.stringify(result, null, '  ');
        var PropJsonResult;
        PropJsonResult = eval("(" + PropJsonResp + ")");

        var len = PropJsonResult.properties.length;
        for (var i = 0; i < len; i++) {
            var oPName = PropJsonResult.properties[i].name;
            var oPValue = PropJsonResult.properties[i].value;

            var newRow = "<tr><td>" + oPName +"</td><td><input type=\"text\" value=\""+oPValue + "\"></td></tr>";
            $("#ConfigProTB tbody tr:last").after(newRow); 
        } 
    } 
    //get the model paramters.
    function UpdateCost(result) {
        if (global.settings.materialjson != "") { 
            for (var i = QuatoTable.rows.length - 1; i > 0; i--) {
                QuatoTable.deleteRow(i);
            }

            var MaterialJsonResp =
          window.JSON.stringify(global.settings.materialjson, null, '  ');
            var MaterialJsonResult = eval("(" + MaterialJsonResp + ")");

            var material_array = new Array();
            var mlen = MaterialJsonResult.length;
            for (var i = 0; i < mlen; i++) {
                var oMName = MaterialJsonResult[i].material;
                var oMPrice = MaterialJsonResult[i].price;
                material_array[oMName] = oMPrice;
            }


            var PropJsonResp = window.JSON.stringify(result, null, '  ');
            var PropJsonResult;
            PropJsonResult = eval("(" + PropJsonResp + ")");


            var component_volumn_array = new Array();
            var component_material_array = new Array();

            var len = PropJsonResult.properties.length;
            for (var i = 0; i < len; i++) {
                var oPName = PropJsonResult.properties[i].name;
                var oPValue = PropJsonResult.properties[i].value;
                if (oPName.indexOf("Volumn") !== -1) {

                    var compName = oPName.substring(0, oPName.indexOf("Volumn"));
                    component_volumn_array[compName] = oPValue;
                    component_material_array[compName] = "Steel";
                }
            }

            for (var i = 0; i < len; i++) {
                var oPName = PropJsonResult.properties[i].name;
                var oPValue = PropJsonResult.properties[i].value;
                if (oPName.indexOf("Material") !== -1) {
                    var compName = oPName.substring(0, oPName.indexOf("Material"));
                    component_material_array[compName] = oPValue;
                }
            }

            var totalCost = 0;

            for (var compName in component_material_array) {
                var rowobj = QuatoTable.insertRow(QuatoTable.rows.length);
                var cell = rowobj.insertCell(rowobj.cells.length);
                cell.innerHTML = compName;

                cell = rowobj.insertCell(rowobj.cells.length);
                var compM = component_material_array[compName];
                cell.innerHTML = compM;

                cell = rowobj.insertCell(rowobj.cells.length);
                var compV = component_volumn_array[compName];
                cell.innerHTML = component_volumn_array[compName];

                cell = rowobj.insertCell(rowobj.cells.length);
                var compCost = parseFloat(compV) * parseFloat(material_array[compM]);
                cell.innerHTML = compCost.toString();

                totalCost += compCost;
            }

            var myDate = new Date();
            myDate.toLocaleString();

            $("#TotalCostText").html("<h2>" + "Total Cost is: " + totalCost.toString() + "</h2>" +
                               "<p>up date time: " + myDate + "</p>");

        }

    }

    var htmlName;

    $("#UpdateQuato").click(function () {
        //alert("UpdateQuato");

        C360Viewer.getPropertyValues(null, UpdateCost);

        var myDate = new Date();
        myDate.toLocaleString();

        htmlName = "cost-" + myDate + ".htm";
        htmlName = htmlName.split(' ').join('_');
        htmlName = htmlName.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_');

        var divContent = $("#QuataTableDiv").html();
        // alert($("#QuataTableDiv").html());

        var param1 = $("#QuataTableDiv").html();
        $.ajax({
            type: "POST",
            url: "Default.aspx/HelloWorld",
            data: "{name: '" + htmlName + "',div:'" + divContent + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //Successfully gone to the server and returned with the string result of the server side function do what you want with the result  
                //alert("OK!to server!");
            }
             , error: function (er) {
                 //Faild to go to the server alert(er.responseText)
                 alert("cannot pass result to server! [send cost] will not be able to produce the correct cost link.");
             }
        });

    });



    $("#modelSelection").change(function () {

        for (var i = QuatoTable.rows.length - 1; i > 0; i--) {
            QuatoTable.deleteRow(i);
        }

        var option = $("#modelSelection").val();
        loadModel(option);
    });



}(this));