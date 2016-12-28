var seneca = require('seneca')();
var seneca_bases = ['127.0.0.1:7000', '127.0.0.1:7001'];
//seneca.use( require('./ping') );
seneca.use('mesh', {  isbase: true,
                      auto: true,
                      port: 7001,
                      bases: seneca_bases,
                      host: '127.0.0.1',
                      stop: false
                   });

seneca.ready( function(err) {
  console.log('Registry base is up and running');
});
