import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | meals new');

function fakerDate() {
  let settings = { year: 'numeric', month: 'short', day: '2-digit' };
  return faker.date.recent(60).toLocaleString('en-us', settings);
}

function fakerTime() {
  let settings = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return faker.date.recent().toLocaleString('en-us', settings);
}

test('creating a new meal', function(assert) {
  authenticateWithRole('user');
  visit('/dashboard');

  click('nav > a:contains("Register meal")');

  fillIn('.form-group.title > input', faker.lorem.sentence());
  fillIn('.form-group.calories > input', faker.random.number({min: 5, max: 1500}));
  fillIn('.form-group.date > input', fakerDate());
  fillIn('.form-group.time > input', fakerTime());

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/meals');
    assert.equal(find('div.alert-success').length, 1);
  });
});

test('creating a new meal as admin', function(assert) {
  authenticateWithRole('admin');
  visit('/dashboard');

  click('nav > a:contains("New meal")');

  server.create('user');
  selectChoose('.form-group.user', '.ember-power-select-option:eq(1)');

  fillIn('.form-group.title > input', faker.lorem.sentence());
  fillIn('.form-group.calories > input', faker.random.number({min: 5, max: 1500}));
  fillIn('.form-group.date > input', fakerDate());
  fillIn('.form-group.time > input', fakerTime());

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/meals');
    assert.equal(find('div.alert-success').length, 1);
  });
});
