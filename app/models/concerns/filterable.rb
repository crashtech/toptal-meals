module Filterable
  extend ActiveSupport::Concern

  # Get a list of params to be used as filter
  def filter(params)
    results = self.where(nil)
    params.each do |key, value|
      results = results.public_send(key, value) if value.present?
    end
    results
  end
end
