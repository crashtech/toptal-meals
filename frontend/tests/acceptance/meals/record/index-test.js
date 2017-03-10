import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | meals record index');

test('visiting an record', function(assert) {
  let meal = server.create('meal');
  authenticateWithRole('user');
  visit('/dashboard');

  click('nav > a:contains("Meals")');
  click('table.table tbody tr:first td:last a[title="Show"]');

  andThen(() => {
    assert.equal(currentURL(), '/meals/' + meal.id);
  });
});
