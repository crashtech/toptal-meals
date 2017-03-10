import { test } from 'qunit';
import { authenticateSession } from 'frontend/tests/helpers/ember-simple-auth';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | signing out');

test('quiting the application', function(assert) {
  authenticateSession(this.application);
  visit('/dashboard');

  click('a#sign-out');

  andThen(() => {
    let session = containerLookup('service:session');
    assert.notOk(session.get('isAuthenticated'));
  });
});
