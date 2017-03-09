import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { RSVP: { Promise } } = Ember;

var mockSession = Ember.Object.extend({ isAuthenticated: false });
var mockStore = Ember.Object.extend({
  queryRecord: function() {
    let result = Ember.Object.extend({ email: 'user01@test.com', role: 'user' });
    return Promise.resolve(result.create());
  }
});

moduleFor('service:current-user', 'Unit | Service | current user', {
  beforeEach() {
    this.subject().store = mockStore.create();
    this.subject().session = mockSession.create();
  }
});

test('it does not load when is not authenticated', function(assert) {
  let service = this.subject();
  return service.load().then(() => {
    assert.ok(Ember.isEmpty(service.data));
  });
});

test('it loads when is authenticated', function(assert) {
  let service = this.subject();

  service.session.isAuthenticated = true;
  return service.load().then(() => {
    assert.notOk(Ember.isEmpty(service.data));
  });
});
