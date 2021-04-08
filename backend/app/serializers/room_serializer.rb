class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :chats
  has_many :canvas
end
