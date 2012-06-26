function XmlReader(xmlfile) {
     var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", xmlfile, false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;

    var lengthX = xmlDoc.getElementsByTagName("x").length;
    var lengthY = xmlDoc.getElementsByTagName("y").length;


    var data1 = new Array();
    var data2 = new Array();

	 var data_des = new Array();
    var dataObj={};

//todo:     reading the xml and creating the array then again reading the array and creating the data array
//todo:     this is not efficient but don't want to call a plugIn function from another plugIn!!!!!!!!!
    for (i = 0; i < lengthY; i++) {
        var txtY = xmlDoc.getElementsByTagName("y")[i].childNodes[0].nodeValue;
        var txtX = xmlDoc.getElementsByTagName("x")[i].childNodes[0].nodeValue;



        var dataValDescription;
        try {
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("point");
            xx = x[i].getElementsByTagName("description");
            dataValDescription = (xx[0].firstChild.nodeValue);

        }
        catch (er) {

            dataValDescription = ("");
        }

        var tem = new Array(txtY,dataValDescription);
        dataObj[txtX]=tem;


    }
    return dataObj;
}
