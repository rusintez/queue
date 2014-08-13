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


/**
 * Constructor
 */

function Queue() {
  this._queue = [];
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

Queue.prototype.end = function(cb) {
  if (!this._queue.length) return cb();  
  var queue = this._queue;

  var next = function(error) {
    if (error !== void 0) return cb(error);

    var task = queue.shift();

    if (!task) return cb();

    task.call(task, (function(){
      var executed = false;
      return function(error) {
        if (executed) throw new Error('callback can\'t be executed twice');
        executed = true;
        next(error);
      }
    })());
  }
  next();
}


/**
 * Force constructor
 */

Queue.prototype.constructor = Queue;


/**
 * Expose
 */

exports = module.exports = Queue;