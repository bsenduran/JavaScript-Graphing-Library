function Bar_Graph(div_name, title) {

    var head = document.getElementsByTagName('head')[0];

    var autoScaleJS = document.createElement('script');
    autoScaleJS.src = "autoScale.js";
    autoScaleJS.type = "text/javascript";

    var styleCSS = document.createElement('link');
    styleCSS.href = "style.css";
    styleCSS.type = "text/css";
    styleCSS.media = "screen";
    styleCSS.rel = "stylesheet";

    head.appendChild(autoScaleJS);
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
    this.min = 0; //MIN INT
    this.des_name = new Array();
    this.dataAsObj = {};
    this.descriptionAsObj = {};

    this.addData = function (x_name, value, muNo) {

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

    }

    //context
    var cont = new Context();
    this.context = cont;
    this.setContext = function (context) {
        this.context = context;
    }
    //

    this.render = function () {
        var ns = new NiceScaleM(10);
        ns.NiceScale1(this.min, this.max);
        var nsMin = ns.getNiceMin();
        var nsMax = ns.getNiceMax();
        var nsTickSpace = ns.getTickSpacing();

//        nsMax = nsMax + nsTickSpace;
        var noOfDivision = Math.round((nsMax - nsMin) / nsTickSpace);


        var titleX = 192;
        var titleY = 100;

        var x0 = titleX + 50;
        var y0 = titleY;
        var yRange = (nsMax - nsMin);
        var graphHeight = 400;
        var graphWidth = 600;

        var yLblXPos = x0 - 20;
        var yLblYPos = y0;

        var fntSize = Math.round(graphWidth * graphHeight / 10000);
        if (fntSize > 16) {
            fntSize = 16;
        } else if (fntSize < 8) {
            fntSize = 8;
        }

        var g = new Core_Function(div_name);

        for (var ii in this.context) {
            g[ii] = this.context[ii];

        }

        var k = 0;
        for (var i = nsMin; i <= nsMax; i += nsTickSpace) {
            var gridVal = nsMin + (nsTickSpace * k);
            if (gridVal.toFixed(1) - Math.round(gridVal) != 0) {
                gridVal = gridVal.toFixed(1);
            }
            g.writeText((x0 - 30), (y0 + graphHeight - ((graphHeight / noOfDivision)) * k)+5, gridVal);
            if (this.context.ShowGrid) {
//                g.drawGrid(0, graphWidth,graphHeight -  (Math.round(graphHeight / noOfDivision) * k), graphHeight -(Math.round(graphHeight / noOfDivision) * k), x0, y0);
                g.drawGrid(0, graphWidth, graphHeight - ((graphHeight / noOfDivision) * k), graphHeight - ((graphHeight / noOfDivision) * k), x0, y0);
            } else {
                g.drawTickV(0, graphHeight - ((graphHeight / noOfDivision) * k), x0, y0);
            }
            k++;
        }

        g.drawYAxis(0, 0, 0, graphHeight, x0, y0);
        g.drawXAxis(0, graphWidth, (graphHeight + (nsMin * graphHeight / yRange)), (graphHeight + (nsMin * graphHeight / yRange)), x0, y0);

        for (var muG = 1; muG <= noOfMultiGraph; muG++) {
            var totalDivisionLen = (graphWidth / this.data[muG].length);
            var totalDivisionLenSub = ( totalDivisionLen / (noOfMultiGraph + 1));
            var barAreaLen = totalDivisionLen - totalDivisionLenSub;
            for (var j = 0; j <= this.data[muG].length - 1; j++) {
                g.setDes(this.dataDescription[muG][j]);
                var barAreaStart = x0 + (totalDivisionLenSub / 2) * (j + 1) + (barAreaLen + (totalDivisionLenSub / 2)) * j + (barAreaLen / noOfMultiGraph) * (muG - 1);
                var barHeight = (this.data[muG][j] * graphHeight / yRange);
                barHeight = (barHeight==0)?1:barHeight;
                if (barHeight < 0) {
                    g.drawShadeRectangle(2 + barAreaStart, y0 + 1 + graphHeight + (nsMin * graphHeight / yRange), (barAreaLen / noOfMultiGraph), barHeight - 1);
                    //last one is optional parameter default value 0
                    g.drawRectangle(barAreaStart, y0 + graphHeight + (nsMin * graphHeight / yRange), (barAreaLen / noOfMultiGraph), barHeight,this.data[0][j],this.data[muG][j], (muG - 1));
                } else {
                    g.drawShadeRectangle(2 + barAreaStart, y0 - 1 + graphHeight - barHeight + (nsMin * graphHeight / yRange), (barAreaLen / noOfMultiGraph), barHeight + 1);
                    //last one is optional parameter default value 0
                    g.drawRectangle(barAreaStart, y0 + graphHeight - barHeight + (nsMin * graphHeight / yRange), (barAreaLen / noOfMultiGraph), barHeight,this.data[0][j],this.data[muG][j], (muG - 1));
                }
                if (muG == noOfMultiGraph) {
                    g.drawTickH(totalDivisionLen * (j + 1), graphHeight + (nsMin * graphHeight / yRange), x0, y0);
                    g.writeTextLbl(x0 + totalDivisionLen / 2 + (j * totalDivisionLen), y0 + graphHeight + 15 + (nsMin * graphHeight / yRange), this.data[0][j]);
                }


            }

        }
        g.tooltipBox();
        g.writeXAxis(x0+graphWidth/2,y0+graphHeight+50);
        g.writeYAxis(x0-35,y0+graphHeight/2);
        g.writeTextLbl(x0+graphWidth/2,y0-20,title);
        g.legendBox(x0, y0, graphWidth, graphHeight,noOfMultiGraph,"bar");


    }

}




