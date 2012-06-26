function getMin(dataObj, n) {
    var sortable = MinMax(dataObj);
//    alert(sortable.toSource());
    var dataObjNew = {};
    for (var k = 0; k < n; k++) {
        dataObjNew[sortable[k][0]] = sortable[k][1];
//        alert(sortable[k][0]);
    }
    return dataObjNew;
}

function getMax(dataObj, n) {
    var sortable = MinMax(dataObj);
    var dataObjNew = {};

    /*alert(sortable[90][1]);
    alert(sortable[99][1]);
    alert(sortable.length);
    alert(sortable.toSource());*/
    for (var k = sortable.length - 1; k > sortable.length - 1 - n; k--) {
       dataObjNew[sortable[k][0]] = sortable[k][1];
    }
    return dataObjNew;
}

function MinMax(dataObj) {
    var sortable = new Array();
    var i = 0;
    for (var lbl in dataObj) {
        sortable[i] = new Array();
        sortable[i][0] = lbl;
        sortable[i].push(dataObj[lbl]);
        i++;
    }

    sortable.sort(function (a, b) {
        return a[1][0] - b[1][0]
    });
    //alert(sortable.toSource());

    return sortable;
}