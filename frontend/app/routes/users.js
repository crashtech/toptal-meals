import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const service = Ember.inject.service;
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: service('current-user'),

  beforeModel(transition) {
    this._super(...arguments);

    // Don't need to check permission for viewing an user
    if(transition.targetName === 'users.record.index') {
      return;
    }

    // Any other page require permission
    let role = this.get('currentUser.data.role');
    if(role && (role !== 'admin' && role !== 'manager')) {
      this.get('flash').error('You don\'t have permission to access this page.');
      this.transitionTo('index');
    }
  }
});
