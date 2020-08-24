// use this to pass info between components if needed

var Utils = (function () {
    var poCreated = [];

    var getPoCreated = function () {
        return poCreated;
    }

    var setPoCreated = function (po) {
        poCreated = po;
    };

    return {
        getPoCreated: getPoCreated,
        setPoCreated: setPoCreated
    }

}

)();

export default Utils;
