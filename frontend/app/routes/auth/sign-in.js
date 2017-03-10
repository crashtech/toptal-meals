import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const service = Ember.inject.service;
export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  currentUser: service('current-user'),
  session: service('session'),

  authenticator: 'authenticator:devise',
  hasLayout: false,

  model() {
    return this.store.createRecord('profile');
  },

  actions: {
    authenticate(form) {
      let auth    = this.get('authenticator');
      let session = this.get('session');

      // Send the authentication request
      let email    = form.get('email');
      let password = form.get('password');
      let promise = session.authenticate(auth, email, password).then(() => {
        this.get('currentUser').load().then(() => {
          this.transitionTo('dashboard');
        });
      }).catch((reason) => {
        this.get('flash').error(reason.error).now();
      });

      // Save the promise on controller, mainly for testing reasons
      this.set('controller.promise', promise);
      return promise;
    }
  }
});
