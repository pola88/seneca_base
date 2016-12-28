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
              host: currentIps[0],
              listen: [{ pin: 'a:1' }, { pin: 'b:1' }]
             })
  // .listen( [ {port: function () { return process.argv[2] }, pin: 'a:1' } ] )
  // .listen( {port: function () { return process.argv[2] }, pin: 'b:1' } )
  // .listen()
  .ready( function() { console.log("server up"); })
  .add('a:1', function (msg, done) {
    console.log("a:1 x:" + msg.x);
    done( null, {a: 1, x: msg.x} )
    // setTimeout( function() {
    //   console.log("====== timeout", done);
    //   done( "error", {a: 100000, x: msg.x} )
    // }, 1000);

  })
  .add('b:1', function (msg, done) {
    console.log("b:1 x:" + msg.x);
    done( null, {a: 1, x: msg.x} )
  })
