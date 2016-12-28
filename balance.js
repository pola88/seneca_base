require('seneca')()
  .use('balance-client')
  .client({
      type: 'balance',
      pin: 'a:1',
      model: function (seneca, msg, targetstate, done) {
        console.log('balance');
        if (0 === targetstate.targets.length) {
          return done( new Error('No targets') )
        }

        // select a random target
        var index = Math.floor(Math.random() * targetstate.targets.length)
        targetstate.targets[index].action.call( seneca, msg, done)
      }
    })
