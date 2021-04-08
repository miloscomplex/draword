class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :chats
  has_one :canva 
end
