import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | meals index');

test('admin and normal users see a list of meals', function(assert) {
  server.createList('meal', 10);
  authenticateWithRole('user');
  visit('/dashboard');

  click('nav > a:contains("Meals")');

  andThen(() => {
    assert.equal(currentURL(), '/meals');
    assert.equal(find('table.table').length, 1);
    assert.equal(find('table.table > tbody > tr').length, 10);
  });
});

test('manager users are not able to access meals endpoint', function(assert) {
  authenticateWithRole('manager');
  visit('/meals');

  andThen(() => {
    assert.equal(currentURL(), '/dashboard');
  });
});
