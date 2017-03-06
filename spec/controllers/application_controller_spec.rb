require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  describe "#params" do
    before :each do
      request.headers['Content-Type'] = nil
      request.body.truncate(0)
      request.body.rewind
    end

    context "without JSON Api headers" do
      it "returns the parameters" do
        result = controller.send(:params)
        expect(result).to be_a(ActionController::Parameters)
      end
    end

    context "with JSON Api headers, but empty data" do
      it "returns the empty parameters" do
        request.headers['Content-Type'] = 'application/vnd.api+json'
        request.body.write('{}')
        request.body.rewind

        result = controller.send(:params)
        expect(result).to be_a(ActionController::Parameters)
        expect(result).to be_empty
      end
    end

    context "with JSON Api headers and valid data" do
      it "returns the received parameters" do
        json = { data: { type: 'user', attributes: { email: 'foo@bar.baz' }, id: '1' } }
        json = json.to_json

        request.headers['Content-Type'] = 'application/vnd.api+json'
        request.body.write(json)
        request.body.rewind

        result = controller.send(:params)
        expect(result).to be_a(ActionController::Parameters)
        expect(result).to have_key(:user)
        expect(result[:user]).to have_key(:id)
        expect(result[:user]).to have_key(:email)
      end
    end

    context "with JSON Api headers and invalid data" do
      it "raises invalid parameters" do
        request.headers['Content-Type'] = 'application/vnd.api+json'
        request.body.write('{"data":{}}')
        request.body.rewind

        expect { controller.send(:params) }.to raise_error(ActionController::ParameterMissing)
      end
    end
  end

  describe "#render" do
    before :each do
      @mock_response = response.clone
      controller.instance_variable_set(:@_response, @mock_response)
    end

    before :each do
      create_list(:user, 100)
    end

    context "with query parameters" do
      it "with :queryable option" do
        name = 'xxyyzzaabbeeffgg'
        create(:user, first_name: name)
        params = ActionController::Parameters.new(q: name)
        allow_any_instance_of(subject.class).to receive(:params).and_return(params)

        controller.send(:render, User.all, queryable: true)
        json = JSON.parse(@mock_response.body)

        expect(json['data'].length).to eq(1)
      end

      it "without :queryable option" do
        name = 'xxyyzzaabbeeffgg'
        create(:user, first_name: name)
        params = ActionController::Parameters.new(q: name)
        allow_any_instance_of(subject.class).to receive(:params).and_return(params)

        controller.send(:render, User.all)
        json = JSON.parse(@mock_response.body)

        expect(json['data'].length).to eq(101)
      end
    end

    context "with pages parameters" do
      it "with :paginable option" do
        params = ActionController::Parameters.new(page: { number: 2, size: 15 })
        allow_any_instance_of(subject.class).to receive(:params).and_return(params)

        controller.send(:render, User.all, paginable: true)
        json = JSON.parse(@mock_response.body)

        expect(json).to have_key('links')
        expect(json['data'].length).to eq(15)
      end

      it "without :paginable option" do
        params = ActionController::Parameters.new(page: { number: 2, size: 15 })
        allow_any_instance_of(subject.class).to receive(:params).and_return(params)

        controller.send(:render, User.all)
        json = JSON.parse(@mock_response.body)

        expect(json['data'].length).to eq(100)
      end
    end
  end
end
