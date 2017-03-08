import Ember from 'ember';

const service = Ember.inject.service;
export default Ember.Route.extend({
  session: service('session'),

  beforeModel() {
    this.get('session').invalidate();
  }
});
