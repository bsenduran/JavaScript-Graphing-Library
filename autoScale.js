function NiceScaleM(maxTicks) {
    this.minPoint;
    this.maxPoint;
    this.maxTicks = maxTicks;
    this.tickSpacing;
    this.range;
    this.niceMin;
    this.niceMax;

    this.NiceScale1 = function (min, max) {
        this.minPoint = min;
        this.maxPoint = max;
        this.calculate();
    }

    this.calculate = function () {
        this.range = this.niceNum(this.maxPoint - this.minPoint, false);
        this.tickSpacing = this.niceNum(this.range / (this.maxTicks - 1), true);
        this.niceMin = Math.floor(this.minPoint / this.tickSpacing) * this.tickSpacing;
        this.niceMax = Math.ceil(this.maxPoint / this.tickSpacing) * this.tickSpacing;
    }

    this.niceNum = function (range, round) {
        var exponent;
        /** exponent of range */
        var fraction;
        /** fractional part of range */
        var niceFraction;
        /** nice, rounded fraction */

        exponent = Math.floor(Math.log(range) / Math.log(10));
        fraction = range / Math.pow(10, exponent);

        if (round) {
            if (fraction < 1.5)
                niceFraction = 1;
            else if (fraction < 3)
                niceFraction = 2;
            else if (fraction < 7)
                niceFraction = 5;
            else
                niceFraction = 10;
        } else {
            if (fraction <= 1)
                niceFraction = 1;
            else if (fraction <= 2)
                niceFraction = 2;
            else if (fraction <= 5)
                niceFraction = 5;
            else
                niceFraction = 10;
        }
        return niceFraction * Math.pow(10, exponent);
    }

    this.setMinMaxPoints = function (minPoint, maxPoint) {
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
        this.calculate();
    }

    this.setMaxTicks = function (maxTicks) {
        this.maxTicks = maxTicks;
        this.calculate();
    }

    this.getTickSpacing = function () {
        return this.tickSpacing;
    }

    this.getNiceMin = function () {
        return this.niceMin;
    }

    this.getNiceMax = function () {
        return this.niceMax;
    }
}
