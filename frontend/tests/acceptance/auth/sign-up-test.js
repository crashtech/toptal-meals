import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | signing up');

test('creating a new account', function(assert) {
  visit('/');
  click('a#sign-up');

  let password = faker.internet.password();

  fillIn('.form-group.email > input', faker.internet.email());
  fillIn('.form-group.first-name > input', faker.name.firstName());
  fillIn('.form-group.last-name > input', faker.name.lastName());
  fillIn('.form-group.password > input', password);
  fillIn('.form-group.password-confirmation > input', password);

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/token-access');
    assert.equal(find('div.alert-success').length, 1);
  });
});
