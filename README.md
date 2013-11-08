queue
=====

FIFO queue for node and browser

### Example

    Queue()
      .add(function(next){ console.log(1); next(); })
      .add(function(next){ console.log(2); next(); })
      .add(function(next){ console.log(3); next(); })
      .run(function(error){ console.log(error, 'finish'); }); // -> 1 ; 2 ; 3 ; undefined, 'finish'
    

    var q = new Queue();
    q.add(function(next){ setInterval(function(){ next(); }, 1000); });
    q.run(function(error){}); // -> will throw an error, after 2000ms (on second tick)
    
    
