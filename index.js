function Queue() {
  this._queue = [];
  this._scope = Array.prototype.slice.call(arguments);
  return this;
}

Queue.prototype.add = function(fn) {
  this._queue.push(fn);
  return this;
}


Queue.prototype.run = function(cb) {
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

Queue.prototype.constructor = Queue;
