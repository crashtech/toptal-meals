# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  first_name             :string(100)      not null
#  last_name              :string(100)
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  authentication_token   :string
#  role                   :integer          default("user"), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_authentication_token  (authentication_token) UNIQUE
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#

require 'rails_helper'

RSpec.describe User, type: :model do
  describe "authentication_token" do
    it "should not be initated with the class" do
      user = build(:user)
      expect(user.authentication_token).to be_blank
    end

    it "should be craeted automatically" do
      user = build(:user)
      expect(user.authentication_token).to be_blank
      expect(user.save).to be_truthy
      expect(user.authentication_token).to_not be_blank
    end

    it "should not be edited automatically" do
      user = create(:user)
      token = user.authentication_token
      old_name = user.first_name

      user.attributes = { first_name: Faker::Name.name }

      expect(user.save).to be_truthy
      expect(user.first_name).to_not be_eql(old_name)
      expect(user.authentication_token).to be_eql(token)
    end
  end

  describe "roles" do
    it "has a list of roles" do
      expect(subject.class).to respond_to(:roles)
      expect(subject.class.roles).to be_a(Hash)
    end

    it "starts with user role" do
      expect(subject.user?).to be_truthy
    end
  end
end
