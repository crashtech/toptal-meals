import Ember from 'ember';

export default Ember.Controller.extend({
  checking: false,

  types: [
    { value: 'confirm',  content: 'Account confirmation' },
    { value: 'unlock',   content: 'Unlock account' },
    { value: 'password', content: 'Recovery of password', showPassword: true }
  ]
});
