# Sync model validation with table preset validations
module TableValidations
  extend ActiveSupport::Concern

  # Load validations from database
  def import_table_validations(skip_columns = [])
    return unless connection.data_source_exists?(table_name)

    load_schema
    skip_columns += associations_foreigns
    skip_columns += [primary_key, 'created_at', 'updated_at']
    skip_columns += Rails.application.config.filter_parameters.map do |item|
      ["#{item}", "#{item}_confirmation", "encrypted_#{item}"]
    end.flatten

    @columns_hash.except(*skip_columns).each do |name, column|
      validations = {}

      # Prepare the validations
      unless column.null
        if boolean?(column)
          validations[:inclusion] = [true, false]
        else
          validations[:presence] = true
        end
      end

      unless column.limit.nil? || numeric?(column)
        validations[:length] = { maximum: column.limit }
      end

      # Apply validations
      validates name, validations unless validations.empty?
    end
  end

  private

    # Check if a column is numeric
    def numeric?(column)
      if column.is_a?(ActiveRecord::ConnectionAdapters::Column)
        type = connection.lookup_cast_type_from_column(column).class
      else
        type = attribute_types[column.to_s].class
      end
      type.included_modules.include?(ActiveModel::Type::Helpers::Numeric)
    end

    # Check if a column is boolean
    def boolean?(column)
      column.type == :boolean
    end

    # Get all columns related to associations
    def associations_foreigns
      _reflections.map do |_, reflection|
        cols = [reflection.foreign_key]
        cols << reflection.foreign_type if reflection.polymorphic?
        cols
      end.flatten
    end
end
