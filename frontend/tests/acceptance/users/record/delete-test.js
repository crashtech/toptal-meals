import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | users record delete');

test('accessing the delete page', function(assert) {
  let user = server.create('user');
  authenticateWithRole('admin');
  visit('/dashboard');

  click('header > a:contains("Users")');
  click('table.table tbody tr:first td:last a[title="Delete"]');

  andThen(() => {
    assert.equal(currentURL(), `/users/${user.id}/delete`);
  });
});

test('cancelling the delete action', function(assert) {
  let user = server.create('user');
  authenticateWithRole('admin');
  visit(`/users/${user.id}/delete`);

  click('div.alert-danger a.btn-default');
  visit('/users');

  andThen(() => {
    assert.equal(find('table.table > tbody > tr').length, 2);
  });
});

test('confirming the delete action', function(assert) {
  let user = server.create('user');
  authenticateWithRole('admin');
  visit(`/users/${user.id}/delete`);

  click('div.alert-danger a.btn-danger');

  andThen(() => {
    assert.equal(currentURL(), '/users');
    assert.equal(find('table.table > tbody > tr').length, 1);
  });
});
