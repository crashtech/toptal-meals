class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  extend TableValidations
  extend Filterable
  extend Queryable
end
