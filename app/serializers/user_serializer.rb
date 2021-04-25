class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_drawing, :room_id
  has_one :room
end
