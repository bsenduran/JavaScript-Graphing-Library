function JsonReader(jsonFile) {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.open("GET", jsonFile, false);
    xmlHttp.send(null);
    var jsonTxt = xmlHttp.responseText;
    var jsonObject = eval("(" + jsonTxt + ")");

    var asJson={};
    for (var i = 0; i < jsonObject.records.length; i++) {
        var tem = new Array(jsonObject.records[i].value,jsonObject.records[i].description);
        asJson[jsonObject.records[i].name] = tem;

    }
    return asJson;

}