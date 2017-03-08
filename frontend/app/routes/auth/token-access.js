import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const getOwner = Ember.getOwner;
const Promise = Ember.RSVP.Promise;
const service = Ember.inject.service;
export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: service('session'),
  hasLayout: false,

  model() {
    return {
      type: null,
      token: null,
      password: null,
      passwordConfirmation: null
    };
  },

  // Helper method to send check actions
  request(path, token, method) {
    let adapter = this.get('store').adapterFor('user');

    let url = adapter.buildURL('profile') + path;
    return adapter.ajax(url, method || 'GET', { data: token }).then((data) => {
      this.authenticate(data);
      this.transitionTo('index');
    }, (reason) => {
      this.get('flash').error(reason.errors).now();
      return Promise.reject(reason);
    });
  },

  // Use the data received to authenticate the user
  authenticate(data) {
    let authenticatorFactory = 'authenticator:devise';
    let authenticator = getOwner(this).lookup(authenticatorFactory);
    let internalSession = this.get('session.session');
    authenticator.restore(data).then((content) => {
      this.get('flash').ok('You have been successfully authenticated using a token.');
      return internalSession._setup(authenticatorFactory, content, true);
    });
  },

  actions: {
    // Save the password
    validate(model) {
      this.send(model.type.value, model.token, model);
    },

    // Check if a given token can confirm the user's account
    confirm(token) {
      let params = { confirmation_token: token };
      this.request('/confirmation', params);
    },

    // Check if a given token can unlock the user's account
    unlock(token) {
      let params = { unlock_token: token };
      this.request('/unlock', params);
    },

    // Try to set the user password using a given token
    password(token) {
      let model = this.get('controller.model');
      let params = { type: 'user', attributes: {} };
      params.attributes.reset_password_token = token;
      params.attributes.password_confirmation = model.passwordConfirmation;
      params.attributes.password = model.password;
      this.request('/password', { data: params }, 'PUT').catch((errors) => {
        if(errors.data.messages.length > 1) {
          let message = '<b>Reset Password Token</b> is invalid';
          let header = errors.data.header.replace(/\d+ errors/, '1 error');
          Ember.set(errors.data, 'messages', [message]);
          Ember.set(errors.data, 'header', header);
        }
      });
    }
  }
});
