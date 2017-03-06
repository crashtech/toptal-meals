# == Schema Information
#
# Table name: meals
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string(100)      not null
#  calories   :integer          not null
#  date       :date             not null
#  time       :time             not null
#  deleted    :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_meals_on_date     (date)
#  index_meals_on_deleted  (deleted)
#  index_meals_on_time     (time)
#  index_meals_on_user_id  (user_id)
#

class Meal < ApplicationRecord
  belongs_to :user

  default_scope { order(time: :desc) }
  scope :available, -> { where(deleted: false) }
  scope :exclusive, -> (user) do
    where(user_id: user.id) if user.user?
  end

  import_table_validations
end
