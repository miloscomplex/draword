class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :chats
  has_many :canvas
  has_one :selected_phrase_id
end
