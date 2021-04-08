Rails.application.routes.draw do
  resources :scores
  resources :users
  # Action Cable
  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]
  mount ActionCable.server => '/cable'
  # /cable is only a convention; init websockets vs HTTP

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
