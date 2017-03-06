require "rails_helper"

RSpec.describe ProfilesController, type: :routing do
  describe "routing" do

    it "routes to #profile" do
      expect(get: "/profile").to route_to("profiles#show")
    end

    it "routes to profiles#create" do
      expect(post: "/profile").to route_to("profiles#create")
    end

    it "routes to #update" do
      expect(put: "/profile").to route_to("profiles#update")
    end

    it "routes to #update" do
      expect(patch: "/profile").to route_to("profiles#update")
    end

    it "routes to sessions#create" do
      expect(post: "/profile/sign_in").to route_to("devise/sessions#create")
    end

    it "routes to unlocks#show" do
      expect(get: "/profile/unlock").to route_to("devise/unlocks#show")
    end

    it "routes to confirmations#show" do
      expect(get: "/profile/confirmation").to route_to("devise/confirmations#show")
    end

    it "routes to passwords#show" do
      expect(post: "/profile/password").to route_to("devise/passwords#create")
    end

    it "routes to passwords#create" do
      expect(put: "/profile/password").to route_to("devise/passwords#update")
    end

    it "routes to passwords#create" do
      expect(patch: "/profile/password").to route_to("devise/passwords#update")
    end

  end
end
