require 'rails_helper'

RSpec.describe "Requests", :type => :request do

	def create_valid_user_and_login
		post '/sign_up', {name: 'test_name', username: 'test_username', password: 'test_pass', email: 'test@test.com',
                address: {address: '123 Main Rd, Goleta CA 93117 USA', latitude: 0, longitude: 0}}	                    
    	post '/login', {email: 'test@test.com', password: 'test_pass'}
  	end

	def create_request(auth_token)
		post '/requests', { request:{user_id: 1, expiration_date: '28-11-16', 
			request_items: [{name: "Candy", "max_price":10, "quantity_description":"3"}]}},
			{'HTTP_AUTHORIZATION'=>auth_token}
	end

  	describe "GET /requests" do
    	it "works! (now write some real specs)" do
     		create_valid_user_and_login
     		token = Authentication::JsonWebToken.encode(User.last.id)
     		create_request(token)
     		request = Request.last
     		post '/requests/accept/', {:id => request.id}, {'HTTP_AUTHORIZATION'=>token}
     		expect(response).to have_http_status(200)
    	end
  	end

	# describe 'POST #accept_request' do
	# 	context 'when valid id is passed' do
	# 		it 'returns 200 status' do
	# 			create_request
	# 			request = Request.last
	# 			create_valid_user_and_login
	# 			post :accept_request, {:id => request.id}
	# 			expect(response).to have_http_status(200)
	# 		end

	# 	it 'updates the hero_id and status' do
	# 			create_request
	# 			request = Request.last
	# 			create_valid_user_and_login
	# 			post :accept_request, {:id => request.id}
	# 			updated_request = Request.last
	# 			expect(updated_request.hero_id).to eq(1)
	# 			expect(updated_request.status).to eq(1)
	# 		end
		# end
	# end
end
