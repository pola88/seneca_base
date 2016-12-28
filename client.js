var seneca_bases = ['127.0.0.1:7000', '127.0.0.1:7001'];
var os = require('os');

function getIPs() {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === "IPv4" && !address.internal) {
              addresses.push(address.address);
          }
      }
  }

  return addresses;
}
var currentIps = getIPs();

require('seneca')()
  .use('mesh', {
                auto: true,
                isBase: false,
                bases: seneca_bases,
                host: currentIps[0]
              })
  .ready( function () {
    var client = this.client();

    callAct(client);
  })


var callAct = function(client) {
  for ( var i = 0; i < 4; i++ ) {
    client.act( 'a:1,x:' + i, function(error) {
      if(error) {
        console.log(error);
      } else {
        console.log("ok");
      }
    } )
  }

  for ( var i = 0; i < 4; i++ ) {
    client.act( 'b:1,x:' + i, function(error) {
      if(error) {
        console.log(error);
      } else {
        console.log("ok");
      }
    });
  }
  setTimeout( function() {
    callAct(client);
  });
}
