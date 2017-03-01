class ApplicationSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  class << self
    def time_ago(*attributes)
      attributes.each do |item|
        attribute item do
          time_ago_in_words(object[item]) unless object[item].nil?
        end
      end
    end
  end
end
