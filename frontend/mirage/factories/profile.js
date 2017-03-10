import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName() { return faker.name.firstName(); },
  lastName()  { return faker.name.lastName(); },
  email()     { return faker.internet.email(); },

  role:                 'user',
  password:             '123456789',
  passwordConfirmation: '123456789'
});
