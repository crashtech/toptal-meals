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

class SettingsSerializer < ApplicationSerializer
  attributes :id, :calories_per_day
end
