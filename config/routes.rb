# == Route Map
#
#               Prefix Verb   URI Pattern                     Controller#Action
#             settings GET    /settings(.:format)             settings#show
#                      PATCH  /settings(.:format)             settings#update
#                      PUT    /settings(.:format)             settings#update
#                meals GET    /meals(.:format)                meals#index
#                      POST   /meals(.:format)                meals#create
#                 meal GET    /meals/:id(.:format)            meals#show
#                      PATCH  /meals/:id(.:format)            meals#update
#                      PUT    /meals/:id(.:format)            meals#update
#                      DELETE /meals/:id(.:format)            meals#destroy
#      profile_sign_in POST   /profile/sign_in(.:format)      devise/sessions#create
#       profile_unlock GET    /profile/unlock(.:format)       devise/unlocks#show
# profile_confirmation GET    /profile/confirmation(.:format) devise/confirmations#show
#     profile_password POST   /profile/password(.:format)     devise/passwords#create
#                      PUT    /profile/password(.:format)     devise/passwords#update
#                      PATCH  /profile/password(.:format)     devise/passwords#update
#              profile GET    /profile(.:format)              profiles#show
#                      PATCH  /profile(.:format)              profiles#update
#                      PUT    /profile(.:format)              profiles#update
#                      POST   /profile(.:format)              profiles#create
#                users GET    /users(.:format)                users#index
#                      POST   /users(.:format)                users#create
#                 user GET    /users/:id(.:format)            users#show
#                      PATCH  /users/:id(.:format)            users#update
#                      PUT    /users/:id(.:format)            users#update
#                      DELETE /users/:id(.:format)            users#destroy
#                 root GET    /                               application#index
#

Rails.application.routes.draw do

  resources :meals
  resource :settings, only: :show do
    match '(/:id)', action: :update, via: [:put, :patch]
  end

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
