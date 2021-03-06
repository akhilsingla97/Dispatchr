# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170304024217) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "address"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "item_stores", force: :cascade do |t|
    t.integer  "item_id"
    t.integer  "store_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_item_stores_on_item_id", using: :btree
    t.index ["store_id"], name: "index_item_stores_on_store_id", using: :btree
  end

  create_table "items", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "customer"
    t.string   "funding_source"
    t.string   "routing_number"
    t.string   "account_number"
    t.string   "account_type"
    t.string   "account_name"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "request_items", force: :cascade do |t|
    t.integer  "request_id"
    t.integer  "item_id"
    t.decimal  "max_price"
    t.string   "quantity_description"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["item_id"], name: "index_request_items_on_item_id", using: :btree
    t.index ["request_id"], name: "index_request_items_on_request_id", using: :btree
  end

  create_table "requests", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "expiration_date"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "hero_id"
    t.integer  "status"
    t.index ["user_id"], name: "index_requests_on_user_id", using: :btree
  end

  create_table "stores", force: :cascade do |t|
    t.string   "name"
    t.integer  "address_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_stores_on_address_id", using: :btree
  end

  create_table "token_data", force: :cascade do |t|
    t.string   "encrypted_access_token"
    t.string   "encrypted_access_token_iv"
    t.string   "encrypted_refresh_token"
    t.string   "encrypted_refresh_token_iv"
    t.integer  "expires_in"
    t.string   "scope"
    t.string   "account_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "username"
    t.string   "password_digest"
    t.string   "email"
    t.integer  "address_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.decimal  "reputation",      default: "0.0"
    t.integer  "numReviews",      default: 0
    t.index ["address_id"], name: "index_users_on_address_id", using: :btree
  end

end
