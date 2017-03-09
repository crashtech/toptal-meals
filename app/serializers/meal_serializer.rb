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

class MealSerializer < ApplicationSerializer
  attributes :id, :title, :calories, :date
  has_one :user

  attribute :date_formatted do
    I18n.l object.date, format: :long
  end

  attribute :time_formatted do
    I18n.l object.time, format: :hour
  end

  attribute :time do
    I18n.l object.time, format: :time
  end

  attribute :date_time_ago do
    time = object.date.to_time
    time += object.time.seconds_since_midnight
    time_ago_in_words(time)
  end

  class UserSerializer < ApplicationSerializer
    attributes :first_name, :last_name, :email
  end
end
