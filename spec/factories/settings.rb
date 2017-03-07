# == Schema Information
#
# Table name: settings
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  calories_per_day :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_settings_on_user_id  (user_id)
#

FactoryGirl.define do
  factory :settings do
    calories_per_day { Faker::Number.between(1000, 5000) }

    factory :settings_with_associations do
      user_id { create(:user).id }
    end
  end
end
