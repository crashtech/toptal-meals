import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName:            DS.attr('string'),
  lastName:             DS.attr('string'),
  email:                DS.attr('string'),
  password:             DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  signInCount:          DS.attr('number'),
  failedAttempts:       DS.attr('number'),
  createdAt:            DS.attr('string'),
  currentSignInAt:      DS.attr('string'),
  lastSignInAt:         DS.attr('string'),
  confirmedAt:          DS.attr('string'),
  confirmationSentAt:   DS.attr('string'),
  lockedAt:             DS.attr('string'),
  roleDescription:      DS.attr('string'),
  role:                 DS.attr('string'),

  label: Ember.computed('firstName', 'email', function() {
    let info = `${this.get('firstName')} (${this.get('email')})`;
    return info.htmlSafe();
  }),

  roles: ['user', 'manager', 'admin']
});
