function Core_Function(div_name) {

    var container = document.getElementById(div_name);
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("version", "1.1");
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "100%");
    svgElement.setAttribute("onload", "init(evt)");

    this.drawArc = function (x, y, r, angle, lastAngle, temcolor, xdata, ydata) {
        var arc1 = document.createElementNS("http://www.w3.org/2000/svg", "path");

        var animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");

        var attributeLx = x + Math.round(r * Math.cos(lastAngle));
        var attributeLy = y + Math.round(r * Math.sin(lastAngle));

        var attributeNewX = x + Math.round(r * Math.cos(lastAngle + angle));
        var attributeNewY = y + Math.round(r * Math.sin(lastAngle + angle));
        arc1.setAttribute("d", "M" + x + "," + y + " L" + attributeLx + "," + attributeLy + " A" + r + "," + r + " 0 0,1 " + attributeNewX + "," + attributeNewY + " z");
        arc1.setAttribute("fill", temcolor);
        arc1.setAttribute("fill-opacity", 1);
        arc1.setAttribute("stroke", "black");
        arc1.setAttribute("stroke-width", 1);

        arc1.setAttribute("onmouseover", "inPie(evt)");
        arc1.setAttribute("onmouseout", "outPie(evt)");


        var str_tooltip = new String("" + xdata + "   : " + ydata + "%");
        var str1_tooltip1 = new String(this.des);
        arc1.setAttribute("onmousemove", "ShowTooltip(evt,'" + str_tooltip + "','" + temcolor + "','" + str1_tooltip1 + "')");
        arc1.setAttribute("onmouseout", "HideTooltip(evt);outPie(evt)");


        svgElement.appendChild(arc1);

        if (this.PlayAnimations == true) {

            animateX.setAttributeNS(null, "attributeName", "d");
            animateX.setAttributeNS(null, "from", "M" + x + "," + y + " L" + attributeLx + "," + attributeLy + " A" + r + "," + r + " 0 0,1 " + attributeLx + "," + attributeLy + " z");
            animateX.setAttributeNS(null, "to", "M" + x + "," + y + " L" + attributeLx + "," + attributeLy + " A" + r + "," + r + " 0 0,1 " + attributeNewX + "," + attributeNewY + " z");
            animateX.setAttributeNS(null, "dur", 0.5);


            arc1.appendChild(animateX);

        }
    }

    this.drawShadow = function (x, y, r) {
        var shadow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        shadow.setAttribute("cx", x);
        shadow.setAttribute("cy", y);
        shadow.setAttribute("r", r);
        shadow.setAttribute("stroke", "gray");
        shadow.setAttribute("fill", "gray");
        shadow.setAttribute("id", "sh1");
        if (this.PlayAnimations == true) {
            var animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");

            animateX.setAttributeNS(null, "attributeName", "r");
            animateX.setAttributeNS(null, "from", "0");
            animateX.setAttributeNS(null, "to", r);
            animateX.setAttributeNS(null, "dur", .5);

            shadow.appendChild(animateX);
        }
        svgElement.appendChild(shadow);
    }


    // todo: both drawDot and drawShadow are creating the circle tag but the color and mouseEvent differs SOMETHING HAS TO BE DONE
    this.drawDot = function (x, y, ydata, xdata) {

        var dot1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot1.setAttribute("onmouseover", "inCircle(evt)");

        dot1.setAttribute("cx", x);
        dot1.setAttribute("cy", y);
        dot1.setAttribute("r", 5);
        dot1.setAttribute("fill", this.Dotcolor);

        //var str_tooltip = new String(this.XAxis+" : "+xdata+"  "+this.YAxis+" : "+ydata);

        str_tooltip = new String("" + xdata + "   : " + ydata);
        str1_tooltip1 = new String(this.des);


        //var str1_tooltip="1";
        dot1.setAttribute("onmousemove", "ShowTooltip(evt,'" + str_tooltip + "','blue','" + str1_tooltip1 + "')");
        dot1.setAttribute("onmouseout", "HideTooltip(evt);outCircle(evt)");

        svgElement.appendChild(dot1);
    }


    this.setDes = function (des) {
        this.des = des;
    }


    this.drawRectangle = function (x, y, w, h, xdata, ydata, nG) {
        nG = (typeof nG == "undefined") ? 0 : nG;
        var rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        //todo change the class attribute value dynamic with the nG value to differentiate multi Bar
        rect1.setAttribute("class","classBar");
        rect1.setAttribute("x", x);
        rect1.setAttribute("y", y);
        rect1.setAttribute("width", w);
        rect1.setAttribute("height", Math.abs(h));
        rect1.setAttribute("stroke", this.StrokeColor);
        rect1.setAttribute("stroke-width", this.StrokeWidth);
        rect1.setAttribute("fill", this.FillColor[nG]);

        rect1.setAttribute("onmouseover", "selRec(evt)");
        rect1.setAttribute("onmouseout", "deselRec(evt)");


        var str1_tooltip = new String(xdata + " : " + ydata);

        var str1_tooltip1 = this.LegendLbl[nG] + new String(this.des);

        rect1.setAttribute("onmousemove", "ShowTooltip(evt,'" + str1_tooltip + "','blue','" + str1_tooltip1 + "')");

        rect1.setAttribute("onmouseout", "HideTooltip(evt);deselRec(evt)");

        svgElement.appendChild(rect1);

        if (this.PlayAnimations == true) {

            var animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            var animateX1 = document.createElementNS("http://www.w3.org/2000/svg", "animate");

            animateX.setAttributeNS(null, "attributeName", "height");
            animateX.setAttributeNS(null, "from", "0");
            animateX.setAttributeNS(null, "to", Math.abs(h));
            animateX.setAttributeNS(null, "dur", this.Elapse);


            animateX1.setAttributeNS(null, "attributeName", "y");
            animateX1.setAttributeNS(null, "from", y + Math.abs(h));
            animateX1.setAttributeNS(null, "to", y);
            animateX1.setAttributeNS(null, "dur", this.Elapse);


            rect1.appendChild(animateX);
            if (h > 0) {
                rect1.appendChild(animateX1);
            }

        }
    }


    this.drawShadeRectangle = function (x, y, w, h) {
        var rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rect1.setAttribute("x", x);
        rect1.setAttribute("y", y);
        rect1.setAttribute("width", w);
        rect1.setAttribute("height", Math.abs(h));
        rect1.setAttribute("stroke", "grey");
        rect1.setAttribute("stroke-width", "2");
        rect1.setAttribute("fill", "grey");

        svgElement.appendChild(rect1);

        if (this.PlayAnimations == true) {

            var animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            var animateX1 = document.createElementNS("http://www.w3.org/2000/svg", "animate");

            animateX.setAttributeNS(null, "attributeName", "height");
            animateX.setAttributeNS(null, "from", "0");
            animateX.setAttributeNS(null, "to", Math.abs(h));
            animateX.setAttributeNS(null, "dur", this.Elapse);


            animateX1.setAttributeNS(null, "attributeName", "y");
            animateX1.setAttributeNS(null, "from", y + Math.abs(h));
            animateX1.setAttributeNS(null, "to", y);
            animateX1.setAttributeNS(null, "dur", this.Elapse);


            rect1.appendChild(animateX);
            if (h > 0) {
                rect1.appendChild(animateX1);
            }

        }
    }

    this.writeText = function (x, y, txt) {
        var textElement1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement1.setAttribute("x", x);
        textElement1.setAttribute("y", y);

        var textNode = document.createTextNode(txt);
        textElement1.appendChild(textNode);

        svgElement.appendChild(textElement1);
    }
    this.writeTextLbl = function (x, y, txt) {
        var textElement1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement1.setAttribute("x", (x - txt.length * 4)+5);
        textElement1.setAttribute("y", y);
        textElement1.setAttribute("font-size", "12");
//        textElement1.setAttribute("transform","rotate(-45 "+x+","+y+")");

        var textNode = document.createTextNode(txt);
        textElement1.appendChild(textNode);

        svgElement.appendChild(textElement1);
    }


    //todo : drawRectangle doesn't have x0 y0 instead plugIn adds to the x and y
    //todo : removed all the line's animation because, same function is call to draw the grid. NEED TO BE MODIFIED  also line color has to be changed
    this.drawLine = function (x1, x2, y1, y2, x0, y0) {
        if (x1 > x2) {
            var _x2 = x2;
            var _y2 = y2;
            x2 = x1;
            y2 = y1;
            x1 = _x2;
            y1 = _y2;
        }

        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");

        line1.setAttribute("x1", x1 + x0);
        line1.setAttribute("y1", y1 + y0);
        line1.setAttribute("x2", x2 + x0);
        line1.setAttribute("y2", y2 + y0);
        line1.setAttribute("stroke", "green");

        svgElement.appendChild(line1);


    }

    this.drawTickH = function (x, y, x0, y0) {
        var tick1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick1.setAttribute("x1", x + x0);
        tick1.setAttribute("y1", y + y0);
        tick1.setAttribute("x2", x + x0);
        tick1.setAttribute("y2", y + y0 + 10);
        tick1.setAttribute("stroke", this.TickColor);
        tick1.setAttribute("stroke-width", this.GridWidth);
        svgElement.appendChild(tick1);
    }

    this.drawTickV = function (x, y, x0, y0) {
        var tick2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick2.setAttribute("x1", x + x0);
        tick2.setAttribute("y1", y + y0);
        tick2.setAttribute("x2", x + x0 + 10);
        tick2.setAttribute("y2", y + y0);
        tick2.setAttribute("stroke", this.TickColor);
        tick2.setAttribute("stroke-width", this.GridWidth);
        svgElement.appendChild(tick2);
    }

    this.drawXAxis = function (x1, x2, y1, y2, x0, y0) {
        if (x1 > x2) {
            var _x2 = x2;
            var _y2 = y2;
            x2 = x1;
            y2 = y1;
            x1 = _x2;
            y1 = _y2;
        }
        var xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", x1 + x0);
        xAxis.setAttribute("y1", y1 + y0);
        xAxis.setAttribute("x2", x2 + x0);
        xAxis.setAttribute("y2", y2 + y0);
        xAxis.setAttribute("stroke", "black");
        xAxis.setAttribute("stroke-width", 1);
        xAxis.setAttribute("fill", "none");

        svgElement.appendChild(xAxis);
    }
    this.drawYAxis = function (x1, x2, y1, y2, x0, y0) {
        if (x1 > x2) {
            var _x2 = x2;
            var _y2 = y2;
            x2 = x1;
            y2 = y1;
            x1 = _x2;
            y1 = _y2;
        }
        var yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", x1 + x0);
        yAxis.setAttribute("y1", y1 + y0);
        yAxis.setAttribute("x2", x2 + x0);
        yAxis.setAttribute("y2", y2 + y0);
        yAxis.setAttribute("stroke", "black");
        yAxis.setAttribute("stroke-width", 1);
        yAxis.setAttribute("fill", "none");

        svgElement.appendChild(yAxis);
    }
    //x1, x2, y1, y2, x0, y0
    this.drawGrid = function (x1, x2, y1, y2, x0, y0) {
        if (x1 > x2) {
            var _x2 = x2;
            var _y2 = y2;
            x2 = x1;
            y2 = y1;
            x1 = _x2;
            y1 = _y2;
        }

        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");

        line1.setAttribute("x1", x1 + x0);
        line1.setAttribute("y1", y1 + y0);
        line1.setAttribute("x2", x2 + x0);
        line1.setAttribute("y2", y2 + y0);
        line1.setAttribute("stroke", this.GridColor);
        line1.setAttribute("stroke-width", 0.4);
        line1.setAttribute("fill", "none");

        svgElement.appendChild(line1);

    }

    this.pathLine = function (mTo, lTo, i) {
        var pLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var dVal = (mTo + lTo).toString();
        // document.writeln(dVal);

        var idNo = i;

        idName = "path" + idNo;
        pLine.setAttribute("id", idName);
        pLine.setAttribute("class", "classPLine");

        //idNo++;
        pLine.setAttribute("d", dVal);
        pLine.setAttribute("stroke", this.LineColor[i - 1]);

        pLine.setAttribute("stroke-width", this.StrokeWidth);
        pLine.setAttribute("fill", "none");

        /* var animatePath = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
         animatePath.setAttributeNS(null,"attributeName","d");
         animatePath.setAttributeNS(null,"from",mTo+" L0 0");
         animatePath.setAttributeNS(null,"to",dVal);
         //            animatePath.setAttributeNS(null,"dur",0.5);
         animatePath.setAttributeNS(null,"fill","freeze");
         pLine.appendChild(animatePath);*/


        // pLine.setAttribute("onmouseover", "selPath(evt.target.getAttributeNS(null,'id'))");


        //pLine.setAttribute("onmouseout", "deselPath(evt.target.getAttributeNS(null,'id'))");


        pLine.setAttribute("onmouseover", "selPath('" + idName + "')");
        pLine.setAttribute("onmouseout", "deselPath('" + idName + "')");

        svgElement.appendChild(pLine);
    }


    this.tooltipBox = function () {

        var rect_tooltip = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rect_tooltip.setAttribute("x", 0);
        rect_tooltip.setAttribute("y", 0);
        rect_tooltip.setAttribute("rx", 5);
        rect_tooltip.setAttribute("ry", 5);
        rect_tooltip.setAttribute("width", 300);
        rect_tooltip.setAttribute("height", 30);
        rect_tooltip.setAttribute("class", "tooltip_bg");
        rect_tooltip.setAttribute("id", "idTooltipBox");
        rect_tooltip.setAttribute("visibility", "hidden");

        svgElement.appendChild(rect_tooltip);


        var tooltipTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tooltipTxt.setAttribute("class", "tooltip");
        tooltipTxt.setAttribute("id", "idTooltipTxt");
        tooltipTxt.setAttribute("visibility", "visible");
        tooltipTxt.setAttribute("x", 0);
        tooltipTxt.setAttribute("y", 0);

        var tooltipTxtNode1 = document.createTextNode("");
        tooltipTxt.appendChild(tooltipTxtNode1);

        svgElement.appendChild(tooltipTxt);


        var tooltipDesc = document.createElementNS("http://www.w3.org/2000/svg", "text");
        //var txtEl=document.createElement("text");

        tooltipDesc.setAttribute("class", "tooltip1");
        tooltipDesc.setAttribute("id", "idTooltipDesc");
        tooltipDesc.setAttribute("visibility", "visible");
        tooltipDesc.setAttribute("x", 0);
        tooltipDesc.setAttribute("y", 0);

        var tooltipTxtNode2 = document.createTextNode("");

        tooltipDesc.appendChild(tooltipTxtNode2);
        //txtEl.nodeValue="ooo";
        svgElement.appendChild(tooltipDesc);


    }

    ///

    this.legendBox= function (x0,y0,graphWidth,graphHeight,nGr,lType) {

        lType = (typeof lType =="undefined")?"line":"bar";
        var rect_legendBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var longlen = 0;
        for (var l = 0; l < this.LegendLbl.length; l++) {
            if (longlen < this.LegendLbl[l].length)
                longlen = this.LegendLbl[l].length;
        }

        var legendBox_width = 80 + longlen * 4;
        var legendBox_height = 50 + (nGr - 1) * 10;


        switch (this.LegendAlign) {
            case "left-top":

                xVal = x0 - 160;
                yVal = y0;
                break;

            case "left-center":
                xVal = x0 - 160;
                yVal = y0 + graphHeight / 2 * 0.8;

                break;
            case "left-bottom":

                xVal = x0 - 160;
                yVal = y0 + graphHeight;

                break;

            case "right-top":

                xVal = x0 + graphWidth + 40;
                yVal = y0;
                break;

            case "right-center":

                xVal = x0 + graphWidth + 40;
                yVal = y0 + graphHeight / 2 - legendBox_height;


                break;
            case "right-bottom":
                xVal = x0 + graphWidth + 40;
                yVal = y0 + graphHeight - legendBox_height;
                break;

            default:


        }


        rect_legendBox.setAttribute("x", xVal);
        rect_legendBox.setAttribute("y", yVal);
        rect_legendBox.setAttribute("rx", 5);
        rect_legendBox.setAttribute("ry", 5);
        rect_legendBox.setAttribute("width", legendBox_width);

        rect_legendBox.setAttribute("height", legendBox_height);
        rect_legendBox.setAttribute("class", "tooltip_bg");
        rect_legendBox.setAttribute("id", "tooltip_bg1");
        rect_legendBox.setAttribute("visibility", "visible");

        //todo change color
        rect_legendBox.setAttribute("stroke", "#4572A7");
        svgElement.appendChild(rect_legendBox);


        for (var noLegEle = 1; noLegEle <= nGr; noLegEle++) {

            var legendLbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            legendLbl.setAttribute("class", "tooltip");
            legendLbl.setAttribute("id", "tooltip2" + noLegEle);
            legendLbl.setAttribute("visibility", "visible");
            legendLbl.setAttribute("x", xVal + 35);
            legendLbl.setAttribute("y", yVal + 25 + (noLegEle - 1) * 15);

            if (lType == "line") {
                legendLbl.setAttribute("onmouseover", "selPath('path" + noLegEle + "')");
                legendLbl.setAttribute("onmouseout", "deselPath('path" + noLegEle + "')");
            }
           // legendLbl.setAttribute("onclick", "reGenerate('mySVG')");


//           txtEl.setAttribute("onclick","deSelect("+noLegEle+")");


            var legendLblNode = document.createTextNode(this.LegendLbl[noLegEle - 1]);
            legendLbl.appendChild(legendLblNode);

            svgElement.appendChild(legendLbl);

            if (lType == "line") {
                var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");

            var legendLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

            legendLine.setAttribute("x1", xVal + 5);
            legendLine.setAttribute("y1", yVal + 20 + (noLegEle - 1) * 15);
            legendLine.setAttribute("x2", xVal + 30);
            legendLine.setAttribute("y2", yVal + 20 + (noLegEle - 1) * 15);
            legendLine.setAttribute("stroke", this.LineColor[noLegEle - 1]);
            svgElement.appendChild(legendLine);


            var legendDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");


            legendDot.setAttribute("cx", xVal + 15);
            legendDot.setAttribute("cy", yVal + 20 + (noLegEle - 1) * 15);
            legendDot.setAttribute("r", 4);
            legendDot.setAttribute("fill", this.Dotcolor);

            svgElement.appendChild(legendDot);
            } else if (lType == "bar") {
                var legRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                legRect.setAttribute("x", xVal + 5);
                legRect.setAttribute("y", yVal + 15+(noLegEle - 1) * 15);

                legRect.setAttribute("width", 20);
                legRect.setAttribute("height", 10);
                legRect.setAttribute("stroke", this.StrokeColor);
                legRect.setAttribute("fill", this.FillColor[noLegEle - 1]);
                svgElement.appendChild(legRect);
            }
        }



    }

    this.writeXAxis = function(x,y){
        var xTitle = this.XAxis;
        var xTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xTxt.setAttribute("x", x-(xTitle.length)*4);
        xTxt.setAttribute("y", y);

        var textNode = document.createTextNode(xTitle);
        xTxt.appendChild(textNode);

        svgElement.appendChild(xTxt);
    }

    this.writeYAxis = function(x,y){
        var yTitle = this.YAxis;
        var yTx = x;
        var yTy = y+yTitle.length*4;
        var yTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yTxt.setAttribute("x", yTx);
        yTxt.setAttribute("y", yTy);
        yTxt.setAttribute("transform","rotate(-90 "+yTx+","+yTy+")");

        var textNode = document.createTextNode(yTitle);
        yTxt.appendChild(textNode);

        svgElement.appendChild(yTxt);
    }



    container.appendChild(svgElement);

}


//todo: don't keep the function only for pie change into context for animation set
function inPie(evt) {
    var theCircle = evt.target;
    var radius = theCircle.getAttribute("stroke-width");
    radius = 5;
    theCircle.setAttribute("stroke-width", radius);


}

function outPie(evt) {
    var theCircle = evt.target;

    var radius = theCircle.getAttribute("stroke-width");
    radius = 1;
    theCircle.setAttribute("stroke-width", radius);
}


function selPath(id) {
    // var theRectangle = evt.target;


    //var theRectangle = document.getElementById(evt.target.getAttributeNS(null,"id"));


    // theRectangle.setAttribute("stroke-width", 5);

    // id1=evt.target.getAttributeNS(null,'id')

    // alert(evt);

    document.getElementById(id).setAttribute("stroke-width", 4);

}


function deselPath(id) {

    //var theRectangle = evt.target;
    //var theRectangle = document.getElementById(evt.target.getAttributeNS(null,"id"));
    // evt.setAttribute("stroke-width", 2);
    // id1=evt.target.getAttributeNS(null,'id')

    //todo need to set the value by variable
    document.getElementById(id).setAttribute("stroke-width", 2);


}


function selRec(evt) {
    var theRectangle = evt.target;
    theRectangle.setAttribute("stroke-width", 3);
}


function deselRec(evt) {
    var theRectangle = evt.target;
    theRectangle.setAttribute("stroke-width", 2);
}


function inCircle(evt) {
    var theCircle = evt.target;
    var radius = theCircle.getAttribute("r");
    radius = 9;
    theCircle.setAttribute("r", radius);
}

function outCircle(evt) {
    var theCircle = evt.target;
    var radius = theCircle.getAttribute("r");
    radius = 5;
    theCircle.setAttribute("r", radius);
}


function reGenerate(svgID) {
    var svgElement = document.getElementById(svgID);
//    while (svgElement.lastChild) {
//       // alert(svgElement.lastChild);
//        svgElement.removeChild(svgElement.lastChild);
//    }

    // delete g;
    //document.getElementById('svgContainer').innerHTML ="test";

    var g1 = new Line_Graph("svgContainer", "Marks");

    //getMin(XmlReader("points1.xml"), 10);


    g1.addPlugInData(XmlReader("points1.xml"));
//    alert(g1.data.toSource());
    g1.render();


}

function Context() {
    this.PlayAnimations = true;
    this.Elapse = 0.5;
    this.FillColor = new Array(5);
    this.FillColor[0] = "#4F81BD";
    this.FillColor[1] = "#C0504D";
    this.FillColor[2] = "#9BBB59";
    this.FillColor[3] = "#8064A8";
    this.FillColor[4] = "#4BACC6";
    this.StrokeColor = "black";
    //todo need two
    this.StrokeWidth = 2;
    this.GridColor = "black";
    this.ShowGrid = true;
    this.GridWidth = 0.5;
    this.LineColor = new Array(5);
    this.LineColor[0] = "green";
    this.LineColor[1] = "red";
    this.LineColor[2] = "blue";
    this.LineColor[3] = "purple";
    this.LineColor[4] = "yellow";

    this.LegendLbl = new Array(5);
    this.LegendLbl[0] = "Series 1";
    this.LegendLbl[1] = "Series 2";
    this.LegendLbl[2] = "Series 3";
    this.LegendLbl[3] = "Series 4";
    this.LegendLbl[4] = "Series 5";

    this.XAxis = "X";
    this.YAxis = "Y";
    this.Dotcolor = "purple";
    this.LegendXPosition = 0;
    this.LegendYPosition = 0;
    this.LegendAlign = "right-center";
    this.TickColor = "black";

}


///tooltip
function init(evt) {
    if (window.svgDocument == null) {
        var svgDocument = evt.target.ownerDocument;
    }

    var tooltip = svgDocument.getElementById('tooltip');
    var tooltip_bg = svgDocument.getElementById('tooltip_bg');

}

function ShowTooltip(evt, mouseovertext, color, description) {

    if (window.svgDocument == null) {
        svgDocument = evt.target.ownerDocument;
    }

    var tooltipBox = svgDocument.getElementById('idTooltipBox');
    var tooltipTxt = svgDocument.getElementById('idTooltipTxt');
    var tooltipDesc = svgDocument.getElementById('idTooltipDesc');

    tooltipTxt.setAttributeNS(null, "x", evt.clientX + 11);
    tooltipTxt.setAttributeNS(null, "y", evt.clientY + 27);
    tooltipTxt.firstChild.data = mouseovertext;
    tooltipTxt.setAttributeNS(null, "visibility", "visible");


    tooltipDesc.setAttributeNS(null, "x", evt.clientX + 11);
    tooltipDesc.setAttributeNS(null, "y", evt.clientY + 45);
    tooltipDesc.firstChild.data = description;
    tooltipDesc.setAttributeNS(null, "visibility", "visible");
    tooltipDesc.setAttributeNS(null, "fill", "blue");


    var length1 = tooltipTxt.firstChild.length;
    var length2 = tooltipDesc.firstChild.length;
    var longLength;
    if (length1 > length2) {
        longLength = length1;
    } else {
        longLength = length2;
    }

    //todo no hard coded values
    tooltipBox.setAttributeNS(null, "width", longLength * 5 + 20);

    if (description) {
        tooltipBox.setAttributeNS(null, "height", 40);
    } else {
        tooltipBox.setAttributeNS(null, "height", 25);
    }

    tooltipBox.setAttributeNS(null, "x", evt.clientX + 8);
    tooltipBox.setAttributeNS(null, "y", evt.clientY + 10);
    tooltipBox.setAttributeNS(null, "visibility", "visibile");
    tooltipBox.setAttributeNS(null, "stroke", color);


}

function HideTooltip(evt) {
    if (window.svgDocument == null) {
        svgDocument = evt.target.ownerDocument;
    }

    var tooltip = svgDocument.getElementById('idTooltipTxt');
    var tooltip1 = svgDocument.getElementById('idTooltipDesc');
    var tooltip_bg = svgDocument.getElementById('idTooltipBox');


    tooltip.setAttributeNS(null, "visibility", "hidden");
    tooltip1.setAttributeNS(null, "visibility", "hidden");
    tooltip_bg.setAttributeNS(null, "visibility", "hidden");

}


function deSelect(n) {
    //reRender
}


///


