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

  query_by :title, user: [:first_name, :last_name, :email]

  default_scope { order(date: :desc, time: :asc) }
  scope :available, -> { where(deleted: false) }
  scope :exclusive, -> (user) do
    where(user_id: user.id) if user.user?
  end
  scope :date_lte, -> (date_lte) { where('date <= ?', date_lte) }
  scope :date_gte, -> (date_gte) { where('date >= ?', date_gte) }
  scope :time_lte, -> (time_lte) { where('time <= ?', time_lte) }
  scope :time_gte, -> (time_gte) { where('time >= ?', time_gte) }

  import_table_validations
end
