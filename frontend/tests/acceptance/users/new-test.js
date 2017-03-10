import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | types new');

test('creating a new user', function(assert) {
  authenticateWithRole('admin');
  visit('/dashboard');

  click('nav > a:contains("Create user")');

  let password = faker.internet.password();

  fillIn('.form-group.email > input', faker.internet.email());
  fillIn('.form-group.first-name > input', faker.name.firstName());
  fillIn('.form-group.last-name > input', faker.name.lastName());
  fillIn('.form-group.password > input', password);
  fillIn('.form-group.password-confirmation > input', password);
  selectChoose('.form-group.role', 'user');

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/users');
    assert.equal(find('div.alert-success').length, 1);
  });
});
