// Function to be included on RouterDSL
export default function resources(name, options) {
  if (arguments.length === 1) {
    options = {};
  }

  var foreignKey = options.foreignKey || `${name.singularize()}_id`;
  var memberPath = `/:${foreignKey}`;
  var member, collection;

  this.route(name.pluralize(), function() {
    collection = this;
    this.route('record', { path: memberPath }, function() {
      member = this;

      this.route('edit');
      this.route('delete');
    });

    this.route('new');
  });

  return resourceDsl(member, collection);
}

// Allow access to member and collection methods
function resourceDsl(member, collection) {
  var dsl = {
    member(callback) {
      callback.call(member);
      return dsl;
    },
    collection(callback) {
      callback.call(collection);
      return dsl;
    }
  };
  return dsl;
}
