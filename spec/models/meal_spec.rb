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

require 'rails_helper'

RSpec.describe Meal, type: :model do
  describe "month_details" do
    it "summarizes a month" do
      user = create(:user)
      date = Date.today
      create(:meal, user_id: user.id, date: date.next_month)
      create_list(:meal, 2, user_id: user.id, date: date, calories: 100)

      filter = date.strftime('%Y-%m')
      result = subject.class.exclusive(user).month_details(filter)
      expect(result.length).to be_eql(1)
      expect(result.first.calories).to be_eql(200)
    end
  end
end
