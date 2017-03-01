import Ember from 'ember';

export default Ember.Test.registerHelper('containerLookup', function(app, name) {
  return app.__container__.lookup(name);
});
