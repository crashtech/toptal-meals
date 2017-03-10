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
  scope :date_lte, -> (date_lte) { where('date <= ?', date_lte) }
  scope :date_gte, -> (date_gte) { where('date >= ?', date_gte) }
  scope :time_lte, -> (time_lte) { where('time <= ?', time_lte) }
  scope :time_gte, -> (time_gte) { where('time >= ?', time_gte) }
  scope :exclusive, -> (user) do
    where(user_id: user.id) if user.user?
  end
  scope :month_details, -> (month) do
    date_lte(base).date_gte(base.end_of_month).group(:date)
  end

  import_table_validations

  # Get a summary of a given month
  def self.month_details(month)
    initial = Date.parse("#{month}-01")
    final = initial.end_of_month

    columns = []
    columns << arel_table[:id].maximum.as('id')
    columns << arel_table[:user_id].maximum.as('user_id')
    columns << arel_table[:date].as('title')
    columns << arel_table[:id].count.as('meals')
    columns << arel_table[:calories].sum.as('calories')
    columns << arel_table[:time].maximum.as('time')
    columns << arel_table[:date]

    date_lte(final)
      .date_gte(initial)
      .select(*columns)
      .reorder(:date)
      .group(:date)
  end
end
