var assert  = require('assert');
var Queue   = require('..');



describe('Queue', function() {
  
});

  //
  // it '#constructor', ->
  //   assert new Queue instanceof Queue
  //   assert Queue() instanceof Queue
  //
  // it '#add', ->
  //   assert (typeof Queue().add == 'function')
  //   assert (Queue().add.length == 1)
  //   assert Queue().add((next) -> ) instanceof Queue
  //
  // it '#done', ->
  //   assert (typeof Queue().done == 'function')
  //   assert (Queue().done.length == 1)
  //
  // it 'should call next item in the queue on #next, and #done last', (done) ->
  //   expect = 0
  //   q = Queue()
  //   q.add (next) ->
  //     expect++
  //     next()
  //   q.add (next) ->
  //     expect++
  //     next()
  //   q.done (error) ->
  //     assert (expect == 2)
  //     do done
  //
  // it 'should throw when #next is called multiple times', (done) ->
  //   Queue()
  //     .add (next) ->
  //       do next
  //       assert.throws next # called second time
  //       do done
  //     .done (error) ->
  //
  // it 'should throw when #add is called with a non-function', () ->
  //   assert.throws Queue.add, false, 'Add expects a function'
  //
  // it 'should throw when #done is called with a non-function', () ->
  //   assert.throws Queue.done, false, 'Add expects a function'
  //
  // it 'should stop execution once #next is called with an error', (done) ->
  //   expect = 0
  //   q = Queue()
  //   q.add (next) ->
  //     expect++
  //     next('Error')
  //   q.add (next) ->
  //     expect++
  //     next();
  //   q.done (error) ->
  //     assert expect == 1
  //     assert error == 'Error'
  //     do done