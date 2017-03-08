export default function() {
  this.passthrough('/write-coverage');
  this.namespace = '/api';

  // Normal CRUD
  this.resource('profile');
}
