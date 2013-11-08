queue
=====

FIFO queue for node and browser

### Example

    new Queue()
      .add(function(next){ console.log(1); next(); })
      .add(function(next){ console.log(2); next(); })
      .add(function(next){ console.log(3); next(); })
      .run(function(error){ console.log(error, 'finish'); }); // -> 1 ; 2 ; 3 ; undefined, 'finish'
