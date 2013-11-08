function Queue() {
  this._queue = [];
}

Queue.prototype.add = function(fn) {
  this._queue.push(fn);
  return this;
}


Queue.prototype.run = function(cb) {
  var queue = this._queue;
  var next = function(error) {
    if (error !== void 0) return cb(error);
    var task = queue.shift();  
    if (!task) return cb();
    task((function(){
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
