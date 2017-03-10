import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | meals record delete');

test('accessing the delete page', function(assert) {
  let meal = server.create('meal');
  authenticateWithRole('user');
  visit('/dashboard');

  click('nav > a:contains("Meals")');
  click('table.table tbody tr:first td:last a[title="Delete"]');

  andThen(() => {
    assert.equal(currentURL(), `/meals/${meal.id}/delete`);
  });
});

test('cancelling the delete action', function(assert) {
  let meal = server.create('meal');
  authenticateWithRole('user');
  visit(`/meals/${meal.id}/delete`);

  click('div.alert-danger a.btn-default');
  visit('/meals');

  andThen(() => {
    assert.equal(currentURL(), '/meals');
    assert.equal(find('table.table > tbody > tr').length, 1);
  });
});

test('confirming the delete action', function(assert) {
  let meal = server.create('meal');
  authenticateWithRole('user');
  visit(`/meals/${meal.id}/delete`);

  click('div.alert-danger a.btn-danger');

  andThen(() => {
    assert.equal(currentURL(), '/meals');
    assert.equal(find('table.table > tbody > tr').length, 0);
  });
});
