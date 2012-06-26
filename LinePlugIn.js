function Line_Graph(div_name, title) {
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
        for(var mi = 0;mi<noOfMultiGraph+1;mi++){
            this.data[mi]=new Array();
            this.dataDescription[mi]=new Array();
        }
    }


    this.max = -64000; //MAX INT
    this.min = 0; //MIN INT
    this.des_name = new Array();
    this.dataAsObj={};
    this.descriptionAsObj={};

    this.addData = function (x_name, value,muNo) {
//        if(muNo==1){
//            this.data[0].push(x_name);
//        }
//        this.data[muNo].push(parseFloat(value));


    }

        this.setMaxMin= function(val){
            if (val > this.max)
                this.max = parseFloat(val);
            if (val < this.min)
                this.min = parseFloat(val);
        }


    this.addPlugInData = function () {
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
                this.data[noDataSet].push(parseFloat(this.dataAsObj[dataLabel][noDataSet - 1]));

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


    this.render = function () {
        var ns = new NiceScaleM(10);
        ns.NiceScale1(this.min,this.max);
        var nsMin = ns.getNiceMin();
        var nsMax = ns.getNiceMax();
        var nsTickSpace = ns.getTickSpacing();

        nsMax = nsMax+nsTickSpace;
        var noOfDivision = Math.round((nsMax-nsMin)/nsTickSpace);

        var titleX = 100;
        var titleY = 50;

        var x0 = titleX + 100;
        var y0 = titleY + 100;
        var yRange = (nsMax - nsMin);
        var graphWidth = 600;
        var graphHeight = 300;

        var fntSize=Math.round(graphWidth*graphHeight/10000);
        if(fntSize>16){
            fntSize=16;
        }else if(fntSize<8){
            fntSize=8;
        }

        if(typeof g!=undefined){
            delete g;
        }
        var g = new Core_Function(div_name);
        for (var ci in this.context) {
            g[ci] = this.context[ci];
        }

        var k=0;
        for (var i = nsMin; i <= nsMax; i+=nsTickSpace) {
            var gridVal = nsMin + (nsTickSpace * k);
            if(gridVal.toFixed(1)-Math.round(gridVal)!=0){
                gridVal = gridVal.toFixed(1);
            }
//            document.write("<a style='font-size:"+fntSize+"px;position:absolute;left:" + (x0-20) + "px;top:" + (y0+graphHeight - (  Math.round(graphHeight / noOfDivision)) * k) + "px;text-align:right; width:20px'>" + gridVal + "</a>");
            g.writeText((x0-25), (y0+graphHeight - (  Math.round(graphHeight / noOfDivision)) * k),gridVal);
            if(this.context.ShowGrid){
//                g.drawGrid(0, graphWidth,graphHeight -  (Math.round(graphHeight / noOfDivision) * k), graphHeight -(Math.round(graphHeight / noOfDivision) * k), x0, y0);
                g.drawGrid(0, graphWidth,graphHeight -  ((graphHeight / noOfDivision) * k), graphHeight -((graphHeight / noOfDivision) * k), x0, y0);
            }else                     {
                g.drawTickV(0,graphHeight -  (Math.round(graphHeight / noOfDivision) * k),x0,y0);

            }
            k++;
        }

        //y axis
        g.drawYAxis(0,0,0,graphHeight,x0,y0);
        g.drawXAxis(0,graphWidth,(graphHeight +(nsMin * graphHeight / yRange)),(graphHeight +(nsMin * graphHeight / yRange)),x0,y0);
        for(var muG = 1; muG<=noOfMultiGraph;muG++){
            var mTo;
            var lTo="";                                                                                                      //yData, X lbl
            g.setDes(this.dataDescription[muG][0]);
            g.drawDot((20+x0),((graphHeight - (this.data[muG][0] * graphHeight / yRange)+(nsMin * graphHeight / yRange))+y0),this.data[muG][0],this.data[0][0]);

            for (var j = 0; j <= this.data[muG].length - 1; j++) {
                if (j + 1 < this.data[muG].length) {
                    mTo = "M"+(20+x0)+" "+((graphHeight - (this.data[muG][0] * graphHeight / yRange)+(nsMin * graphHeight / yRange))+y0)+" ";

                    lTo += "L"+(20 + (graphWidth / this.data[muG].length) * (j+1)+x0)+" "+((graphHeight - (this.data[muG][j+1] * graphHeight / yRange)+(nsMin * graphHeight / yRange))+y0)+" ";
                    g.setDes(this.dataDescription[muG][j+1]);
                    g.drawDot((20 + (graphWidth / this.data[muG].length) * (j+1)+x0),((graphHeight - (this.data[muG][j+1] * graphHeight / yRange)+(nsMin * graphHeight / yRange))+y0),this.data[muG][j+1],this.data[0][j+1]);
                }

                if(muG==1){
                   // document.write("<a style='font-size:"+fntSize+"px;position:absolute;left:" + (x0+22 + Math.round(graphWidth / this.data[0].length) * j) + "px;top:" + (graphHeight+13 + y0+(nsMin * graphHeight / yRange)) + "px'>" + this.data[0][j] + "</a>");
                     g.writeTextLbl(x0+16 + Math.round(graphWidth / this.data[0].length) * j,(graphHeight+23 + y0+(nsMin * graphHeight / yRange)),this.data[0][j]);
                    //horizontal Ticker
                    g.drawTickH(20 + Math.round(graphWidth / this.data[0].length) * j,(graphHeight + (nsMin * graphHeight / yRange)),x0,y0);
                }

            }
            g.pathLine(mTo,lTo,muG);

        }
        g.tooltipBox();
        g.writeXAxis(x0+graphWidth/2,y0+graphHeight+50);
        g.writeYAxis(x0-30,y0+graphHeight/2);
        g.writeTextLbl(x0+graphWidth/2,y0-20,title);
        g.legendBox(x0,y0,graphWidth,graphHeight,noOfMultiGraph);





    }
}

