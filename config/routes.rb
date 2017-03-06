# == Route Map
#
# Prefix Verb URI Pattern Controller#Action
#   root GET  /           application#index
#

Rails.application.routes.draw do

  # Authentication routes, devise_for is required
  devise_for :users, skip: :all
  devise_scope :user do
    post  'profile/sign_in',      to: 'devise/sessions#create'
    get   'profile/unlock',       to: 'devise/unlocks#show'
    get   'profile/confirmation', to: 'devise/confirmations#show'
    post  'profile/password',     to: 'devise/passwords#create'
    put   'profile/password',     to: 'devise/passwords#update'
    patch 'profile/password',     to: 'devise/passwords#update'

    resource :profile, except: [:destroy]
    resources :users
  end

  # API Information on root
  root 'application#index'

end
