class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title, :selected_phrase_id, :has_drawer
  has_many :chats
  has_many :canvas
  has_one :phrase
  ### React doesn't like it being a child object
end
