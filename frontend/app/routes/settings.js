import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const service = Ember.inject.service;
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),

  beforeModel() {
    this._super(...arguments);
    let role = this.get('currentUser.data.role');
    if(role && role !== 'user') {
      this.get('flash').error('You don\'t have permission to access this page.');
      this.transitionTo('index');
    }
  }
});
