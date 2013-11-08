function Queue() {
  this._queue = [];
}

Queue.prototype.add = function(fn) {
  this._queue.push(fn);
  return this;
}

Queue.prototype._virginScope = function(cb){
  var executed = false;
  return function() {
    if (executed) throw new Error('callback can\'t be executed twice');
    executed = true;
    cb.apply(this, Array.prototype.slice.call(arguments));
  }
}

Queue.prototype.run = function(cb) {
  var q = this;
  var next = function(error) {
    if (error) return cb(error);
    var task = q._queue.shift();  
    if (task) {
      task(q._virginScope(next));
    } else {
      cb();
    }
  }
  next();
}
