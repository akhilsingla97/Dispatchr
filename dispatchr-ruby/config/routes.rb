Rails.application.routes.draw do
  resources :payments
  get '/users/username/', to: 'users#show_by_username'
  get '/users/email/', to: 'users#show_by_email'
  get '/requests/user/:id' => 'requests#search_user'
  get '/request_items/request/' => 'request_items#search_request'
  post '/users' => 'users#create'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  post '/sign_up' => 'registrations#create'
  post '/requests/accept/:id' => 'requests#accept_request'
  post '/requests/complete/:id' => 'requests#complete_request'
  post '/users/reputation/:id' => 'users#update_reputation'
  get '/notifications/get/:user_id' => 'notifications#get_notifications'
  resources :items, :requests, :users, :request_items, :addresses, :notifications
  get '/users/:id', to: 'users#show'
  post '/payments/transfer/:src_id/:dest_id/:amount' => 'payments#transfer'
  post '/requests/hero_complete/:id' => 'requests#hero_complete'
  resources :items, :requests, :users, :request_items, :addresses, :notifications, :payments
end
