export default function() {
  this.passthrough('/write-coverage');
  this.namespace = '/api';

  // Normal CRUD
  this.resource('meals');
  this.resource('users');
  this.resource('profile');
  this.resource('settings');

  // Session routes
  this.get('/profile', () => {
    return server.create('profile');
  });
  this.get('/settings', () => {
    return server.create('settings');
  });
  this.post('/profile/sign_in', () => {
    return server.create('session').attrs;
  });
  this.get('/profile/unlock', () => {
    return server.create('session').attrs;
  });
  this.get('/profile/confirmation', () => {
    return server.create('session').attrs;
  });
  this.put('/profile/password', () => {
    return server.create('session').attrs;
  });
  this.post('/profile/password', () => {
    return {};
  });
}
