function Pie_Graph(div_name, title) {
    var head = document.getElementsByTagName('head')[0];
    var styleCSS = document.createElement('link');
    styleCSS.href = "style.css";
    styleCSS.type = "text/css";
    styleCSS.media = "screen";
    styleCSS.rel = "stylesheet";
    head.appendChild(styleCSS);


    var noOfMultiGraph;
    this.initArray = function (n) {
        noOfMultiGraph = n;

        this.data = new Array();
        this.dataDescription = new Array();
        for (var mi = 0; mi < noOfMultiGraph + 1; mi++) {
            this.data[mi] = new Array();
            this.dataDescription[mi] = new Array();
        }
    }
    this.max = -64000; //MAX INT
    this.min = 64000;
    this.dataAsObj = {};
    this.descriptionAsObj = {};

    this.addData = function (x_name, value, muNo) {
//        if(muNo==1){
//            this.data[0].push(x_name);
//        }
//        this.data[muNo].push(parseFloat(value));


    }

    this.setMaxMin = function (val) {
        if (val > this.max)
            this.max = parseFloat(val);
        if (val < this.min)
            this.min = parseFloat(val);
    }


    this.addPlugInData = function () {
//        alert(arguments.toSource());
        this.initArray(arguments.length);


        for (var dataSetNo = 0; dataSetNo < arguments.length; dataSetNo++) {
            for (var dataLabel in arguments[0]) {
                if (dataSetNo == 0) {
                    var dataTemArr = new Array();
                    var descriptionTemArr = new Array();
                    dataTemArr[0] = arguments[0][dataLabel][0];
                    descriptionTemArr[0] = arguments[0][dataLabel][1];
                    this.dataAsObj[dataLabel] = dataTemArr;
                    this.descriptionAsObj[dataLabel] = descriptionTemArr;
                } else {
                    this.dataAsObj[dataLabel].push(arguments[dataSetNo][dataLabel][0]);
                    this.descriptionAsObj[dataLabel].push(arguments[dataSetNo][dataLabel][1]);
                }
            }
        }

        for (var dataLabel in this.dataAsObj) {
            this.data[0].push(dataLabel);
            this.dataDescription[0].push(dataLabel);
            for (var noDataSet = 1; noDataSet <= arguments.length; noDataSet++) {
                this.data[noDataSet].push(this.dataAsObj[dataLabel][noDataSet - 1]);

                this.dataDescription[noDataSet].push(this.descriptionAsObj[dataLabel][noDataSet - 1]);

                this.setMaxMin(this.dataAsObj[dataLabel][noDataSet - 1]);
            }
        }
//        alert(this.data.toSource());
//        alert(this.descriptionAsObj.toSource());
//        alert(this.dataDescription.toSource());

    }


    // todo: color function instead of this
    this.temColorArr = new Array();
    this.temColorArr[0] = "aqua";
    this.temColorArr[11] = "black";
    this.temColorArr[2] = "blue";
    this.temColorArr[3] = "fuchsia";
    this.temColorArr[4] = "green";
    this.temColorArr[15] = "gray";
    this.temColorArr[6] = "lime";
    this.temColorArr[7] = "maroon";
    this.temColorArr[8] = "navy";
    this.temColorArr[9] = "olive";
    this.temColorArr[10] = "purple";
    this.temColorArr[1] = "red";
    this.temColorArr[12] = "silver";
    this.temColorArr[13] = "teal";
    this.temColorArr[14] = "white";
    this.temColorArr[5] = "yellow";

    this.temGetColor = function (ct) {
        return this.temColorArr[ct];
    }


    //context
    var cont = new Context();
    this.context = cont;
    this.setContext = function (context) {
        this.context = context;
    }
    //

    this.render = function () {

        var g = new Core_Function(div_name);

        var x0 = 200;
        var y0 = 200;
        var radius = 100;

        for (var i in this.context) {
            g[i] = this.context[i];

        }

        g.drawShadow(x0 + 5, y0 + 5, radius);
        for (var muG = 1; muG <= noOfMultiGraph; muG++) {
            var pietot = 0;
            for (var ii = 0; ii < this.data[muG].length; ii++) {
//            alert(this.data[muG][ii]);
                pietot += parseFloat((this.data[muG][ii]));
//            alert(pietot);

            }

            var tstan = 0;
            for (var i = 0; i < this.data[muG].length; i++) {
                var a = 2 * Math.PI * this.data[muG][i] / pietot;

                g.setDes(this.dataDescription[muG][i]);
                g.drawArc(x0, y0, radius - (20 * (muG - 1)), a, tstan, this.temGetColor(i), this.data[0][i], Math.round(this.data[muG][i] / pietot * 100));
                tstan += a;
                // g.writeText((x0 + Math.round(Math.cos(tstan - (a / 2)) * (radius + 20))), (y0 + Math.round(Math.sin(tstan - (a / 2)) * (radius + 20))), this.data[0][i] + "(" + Math.round(this.data[muG][i] / pietot * 100) + "%)");


            }
        }

        // g.drawpie();
        g.tooltipBox();


    }
}