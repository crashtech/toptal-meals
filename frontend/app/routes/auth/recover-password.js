import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  hasLayout: false,

  model() {
    return this.store.createRecord('user');
  },

  actions: {
    send(form) {
      let store = form.get('store');
      let adapter = store.adapterFor('user');
      let url = adapter.buildURL('profile') + '/password';
      adapter.ajax(url, 'POST', { data: form.serialize() }).then(() => {
        let message = {
          title: 'You requested a token to reset your password.',
          detail: 'A message with the instructions and the token has been sent to your email address.'
        };

        this.get('flash').ok(message);
        this.transitionTo('auth.token-access');
      });
    }
  }
});

