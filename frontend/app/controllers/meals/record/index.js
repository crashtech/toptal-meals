import Ember from 'ember';

const service = Ember.inject.service;
export default Ember.Controller.extend({
  account: service('current-user')
});
