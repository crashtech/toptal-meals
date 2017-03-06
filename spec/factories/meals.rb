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

FactoryGirl.define do
  factory :meal do
    title    { Faker::Lorem.sentence }
    calories { Faker::Number.between(5, 1500) }
    date     { Faker::Date.backward(14) }
    time     { I18n.l(Faker::Time.backward(14), format: :hour) }

    trait :invalid do
      title    'a' * 101
      calories nil
    end

    trait :deleted do
      deleted true
    end

    factory :meal_with_associations do
      user_id { create(:user).id }
    end
  end
end
