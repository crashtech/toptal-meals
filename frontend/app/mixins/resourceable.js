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
    extend(query, check(this, false,     'filterQuery'));

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

  // Check if the given attribute is a function that should be called
  if(value.constructor === Function) {
    value = value.call(self);
  }

  // Check if it should use a key on the result or a plain object
  if(key) {
    result[key] = value;
  } else {
    result = value;
  }

  // Return the result
  return result;
}
