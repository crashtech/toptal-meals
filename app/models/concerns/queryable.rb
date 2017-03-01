# Allow query for multiple fields fields and relations
module Queryable
  extend ActiveSupport::Concern

  # Configure fields able to be queried
  def query_by(*attributes)
    @query_by = attributes
  end

  # Perform a LIKE search on given configurated fields
  def query(value)
    Query.new(self, @query_by, value).to_relation
  end

  # Query builder
  class Query
    attr_reader :where, :value

    def initialize(klass, attributes, value)
      @attributes = attributes
      @base_klass = klass
      @value = value
      @where = []
    end

    def to_relation
      includes = iterate_attributes(@attributes, @base_klass)
      query = @where.inject { |x, y| x.or(y) }
      result = @base_klass.where(query)
      result = result.eager_load(*includes) if includes.any?
      result
    end

    private

      def iterate_attributes(attributes, klass)
        includes = []

        attributes.each do |item|
          case item
          when String, Symbol
            where << matches(klass, item)
          when Hash
            item.each do |reflection, attrs|
              klazz = klass._reflections[reflection.to_s].klass
              nested = iterate_attributes(Array.wrap(attrs), klazz)
              includes << (nested.empty? ? reflection : { reflection => nested })
            end
          end
        end

        includes
      end

      def matches(klass, item)
        case
        when klass.send(:numeric?, item)
          klass.arel_table[item].eq(value.to_i)
        else
          klass.arel_table[item].matches("%#{value}%")
        end
      end
  end
end
