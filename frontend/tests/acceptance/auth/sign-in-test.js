import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | signing in');

test('authenticating an existing account', function(assert) {
  visit('/');

  fillIn('.form-group.email > input', faker.internet.email());
  fillIn('.form-group.password > input', faker.internet.password());

  click('button[type=submit]');

  waitForControllerWithPromise('auth/sign-in');

  andThen(() => {
    let session = containerLookup('service:session');
    assert.ok(session.get('isAuthenticated'));
  });
});
