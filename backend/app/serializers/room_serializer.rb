class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title, :selected_phrase_id, :drawer_id
  has_many :chats
  has_many :canvas
  has_one :phrase
  has_many :users
  ### React doesn't like it being a child object
end
