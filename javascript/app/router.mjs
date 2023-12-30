const internals = {};
const externals = {};

internals.routes = {
  mainMenu: {
    hash: "#triviaGame",
    controller: "main-controller",
  },
  playingMenu: {
    hash: "#playingMenu",
    controller: "main-controller",
  },
};

internals.defaultRoute = "mainMenu";
internals.currentHash = "";

externals.start = function () {
  window.location.hash = internals.routes[internals.defaultRoute].hash;
  setInterval(internals.hashCheck, 150);
};

internals.hashCheck = function () {
  //NÃO MUDOU O HASH
  if (window.location.hash === internals.currentHash) {
    return;
  }

  //MUDOU O HASH E ENCONTROU
  let routeName = Object.keys(internals.routes).find(function (name) {
    return window.location.hash === internals.routes[name].hash;
  });

  //MUDOU O HASH E NÃO EXISTE
  if (!routeName) {
    routeName = internals.defaultRoute;
    window.location.hash = internals.routes[routeName].hash;
  }

  internals.loadController(internals.routes[routeName].controller);
};

internals.loadController = function (controllerName) {
  internals.currentHash = window.location.hash;
  import(`./controllers/${controllerName}.mjs`)
  .then((module) => module.default.start())
  .catch((error) => console.log('Error loading controller:', error));

};


export default externals;