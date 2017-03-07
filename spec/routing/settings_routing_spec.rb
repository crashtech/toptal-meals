require "rails_helper"

RSpec.describe SettingsController, type: :routing do
  describe "routing" do

    it "routes to #settings" do
      expect(get: "/settings").to route_to("settings#show")
    end

    it "routes to #update" do
      expect(put: "/settings").to route_to("settings#update")
    end

    it "routes to #update" do
      expect(patch: "/settings").to route_to("settings#update")
    end

  end
end
