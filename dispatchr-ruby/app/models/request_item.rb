class RequestItem < ApplicationRecord
  belongs_to :request, optional: true
  belongs_to :item, optional: true


  #item_id not required. new item created upon each new request_item
  validates :max_price, presence: true
  validates :quantity_description, presence: true

  def self.create_from_list(request_items_json)
    request_items_json.map do |json|
      item = Item.find_or_create_by(name: json[:name])
      request_item = RequestItem.new
      request_item.max_price = json[:max_price]
      request_item.quantity_description = json[:quantity_description]
      request_item.item = item
      request_item
    end
  end
end
