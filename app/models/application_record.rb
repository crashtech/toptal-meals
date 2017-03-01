class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  extend TableValidations
  extend Queryable
end
