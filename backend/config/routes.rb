Rails.application.routes.draw do
  resources :scores
  resources :users
  # Action Cable
  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]
  # /cable is only a convention; init websockets vs HTTP
  resources :rooms, only: [:index, :create]
  resources :chats, only: [:index, :show, :create]
  resources :canvas, only: [:index, :show, :create]
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
