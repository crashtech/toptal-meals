import Ember from 'ember';

const extend = Ember.$.extend;
export default Ember.Mixin.create({
  // Model at this point is totally overwritten
  model() {
    let model = this.get('resource');
    let query = {};

    // Configurations that a resource can have
    extend(query, check(this, 'q',       'searchQuery'));
    extend(query, check(this, 'page',    'pagination'));
    extend(query, check(this, 'include', 'includes'));
    extend(query, check(this, 'scope',   'scope'));

    return this.store.query(model, query);
  }
});

// Check for a value to be extended
function check(self, key, attribute) {
  let value = self.get(attribute);
  if(!value) {
    return {};
  }

  let result = {};

  // Perform based on the type of the value on the attribute
  if(value.constructor === Function) {
    result[key] = value.call(self);
  } else {
    result[key] = value;
  }

  // Return the result
  return result;
}
