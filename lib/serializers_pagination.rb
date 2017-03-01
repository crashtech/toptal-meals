# Send pagination as numbers instead of plain links
# :nocov:
module ActiveModelSerializers
  module Adapter
    class JsonApi
      class PaginationLinks
        def as_json
          pages_from
        end
      end
    end
  end
end
