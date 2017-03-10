import Ember from 'ember';
import { authenticateSession } from 'frontend/tests/helpers/ember-simple-auth';

export default Ember.Test.registerHelper('authenticateWithRole', function(app, role) {
  let user = server.create('user', { role: role });
  server.get('/profile', () => { return user; });
  authenticateSession(app);
  return user;
});
