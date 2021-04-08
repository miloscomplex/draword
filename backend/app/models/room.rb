class Room < ApplicationRecord
  has_many :chats
  has_many :canvas 
end
