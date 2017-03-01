# == Route Map
#
# Prefix Verb URI Pattern Controller#Action
#   root GET  /           application#index
#

Rails.application.routes.draw do

  # Authentication routes, devise_for is required
  devise_for :users, skip: :all

  # API Information on root
  root 'application#index'

end
