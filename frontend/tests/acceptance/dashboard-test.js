import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dashboard');

test('normal users can see a calendar', function(assert) {
  authenticateWithRole('user');
  visit('/dashboard');

  andThen(() => {
    assert.equal(find('main#content section#calendar').length, 1);
  });
});

test('manager users do not see the calendar', function(assert) {
  authenticateWithRole('manager');
  visit('/dashboard');

  andThen(() => {
    assert.equal(find('main#content section#calendar').length, 0);
  });
});

test('admin users do not see the calendar', function(assert) {
  authenticateWithRole('admin');
  visit('/dashboard');

  andThen(() => {
    assert.equal(find('main#content section#calendar').length, 0);
  });
});
