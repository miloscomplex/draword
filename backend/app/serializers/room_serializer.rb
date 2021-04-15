class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title, :selected_phrase_id
  has_many :chats
  has_many :canvas
end
