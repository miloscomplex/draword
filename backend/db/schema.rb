# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_25_224758) do

  create_table "canvas", force: :cascade do |t|
    t.string "action"
    t.integer "offsetX"
    t.integer "offsetY"
    t.integer "room_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["room_id"], name: "index_canvas_on_room_id"
  end

  create_table "chats", force: :cascade do |t|
    t.string "text"
    t.integer "room_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "role"
    t.string "name"
    t.index ["room_id"], name: "index_chats_on_room_id"
  end

  create_table "game_plays", force: :cascade do |t|
    t.string "action"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "phrases", force: :cascade do |t|
    t.string "phrase"
    t.string "difficulty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "selected_phrase_id"
    t.boolean "has_drawer", default: false
    t.index ["selected_phrase_id"], name: "index_rooms_on_selected_phrase_id"
  end

  create_table "scores", force: :cascade do |t|
    t.integer "points"
    t.integer "time_in_seconds"
    t.integer "guesses"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_scores_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "initials"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_drawing", default: false, null: false
    t.integer "room_id"
    t.index ["room_id"], name: "index_users_on_room_id"
  end

  add_foreign_key "canvas", "rooms"
  add_foreign_key "chats", "rooms"
  add_foreign_key "scores", "users"
  add_foreign_key "users", "rooms"
end
