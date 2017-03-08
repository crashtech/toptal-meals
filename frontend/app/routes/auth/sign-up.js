import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  hasLayout: false,

  model() {
    return this.store.createRecord('profile');
  },

  actions: {
    save(record) {
      record.save().then(() => {
        let message = {
          title: 'You have signed up successfully.',
          detail: 'A message with the confirmation token has been sent to your email address.'
        };

        this.get('flash').ok(message);
        this.transitionTo('auth.token-access');
      }).catch((reason) => {
        this.get('flash').error(reason.errors).now();
      });
    }
  }
});
