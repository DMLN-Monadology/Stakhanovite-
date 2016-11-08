Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :boards, only: [:create, :destroy, :update]
    resources :lists, only: [:create, :destroy, :update]
  end

  root to: "static_pages#root"


end
