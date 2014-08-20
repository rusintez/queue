/**
 * FIFO Queue
 * 
 * var Queue = require('./queue');
 * var queue = new Queue();
 *
 * queue.add(function(next) {
 *   setTimeout(function(){
 *     // do some async work
 *     next();
 *   }, 300);
 * });
 *
 * queue.end(function(error) {
 *   // all done
 * });
 */


/*
 * Helpers
 */

function applyToConstructor(constructor, argArray) {
  var args = [null].concat(argArray);
  var factoryFunction = constructor.bind.apply(constructor, args);
  return new factoryFunction();
}

/**
 * Constructor
 */

function Queue() {
  var args = Array.prototype.slice.call(arguments);
  if (!(this instanceof Queue)) {
    return applyToConstructor(Queue, args);
  }
  this._queue = [];
  this._scope = args;
  return this;
}


/*
 * Add step to a queue
 *
 * @param {Function} fn(next)
 * @return {Queue} self
 */

Queue.prototype.add = function(fn) {
  this._queue.push(fn);
  return this;
}


/*
 * Execute queue
 *
 * @param {Function} callback(error)
 */

Queue.prototype.end = Queue.prototype.done = function(cb) {
  if (!this._queue.length) return cb();  
  
  var queue = this._queue;
  var scope = this._scope;
  
  var next = function(error) {
    if (error !== void 0) return cb(error);

    var task = queue.shift();

    if (!task) return cb();

    var s = scope.slice(0);
    
    s.push((function(){
      var executed = false;
      return function(error) {
        if (executed) throw new Error('callback can\'t be executed twice');
        executed = true;
        next(error);
      }
    })());
    
    task.apply(task, s);
  }
  next();
}


/**
 * Expose
 */

exports = module.exports = Queue;