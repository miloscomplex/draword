Rails.application.routes.draw do
  resources :phrases, only: [:index, :show]
  resources :scores
  resources :users
  # Action Cable
  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]
  # /cable is only a convention; init websockets vs HTTP
  resources :rooms, only: [:index, :show, :create, :update]
  resources :chats, only: [:show, :create]
  resources :canvas, only: [:index, :show, :create]
  resources :sessions

  get '/random-phrases', to: 'phrases#show_random', as: 'random-phrases'
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
