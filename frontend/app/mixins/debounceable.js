import Ember from 'ember';

const Runner = Ember.run;
export default Ember.Mixin.create({
  _debounces: {},
  debounceTime: 200,

  singleDebounce(key, wait, callback) {
    this.stopDebounce(key);
    return this.startDebounce(key, wait, callback);
  },

  startDebounce(key, wait, callback) {
    if(this.get('_debounces').hasOwnProperty(key)) {
      return false;
    }

    if (arguments.length === 2 && !callback) {
      callback = wait;
      wait = this.get('debounceTime');
    }

    this.set(`_debounces.${key}`, Runner.debounce(this, () => {
      delete this.get('_debounces')[key];
      callback.call(this);
    }, wait));

    return this.get(`_debounces.${key}`);
  },

  stopDebounce(key) {
    if(!this.get('_debounces').hasOwnProperty(key)) {
      return;
    }

    Runner.cancel(this.get(`_debounces.${key}`));
    delete this.get('_debounces')[key];
  }

});
