import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | users record edit');

test('accessing the edit page', function(assert) {
  let user = server.create('user');
  authenticateWithRole('admin');
  visit('/dashboard');

  click('header > a:contains("Users")');
  click('table.table tbody tr:first td:last a[title="Edit"]');

  andThen(() => {
    assert.equal(currentURL(), `/users/${user.id}/edit`);
  });
});

test('edditing a record', function(assert) {
  let user = server.create('user');
  authenticateWithRole('admin');
  visit(`/users/${user.id}/edit`);

  fillIn('.form-group.first-name > input', faker.name.firstName());
  fillIn('.form-group.last-name > input', faker.name.lastName());
  selectChoose('.form-group.role', 'manager');

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/users');
    assert.equal(find('div.alert-success').length, 1);
  });
});
