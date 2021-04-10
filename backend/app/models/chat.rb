class Chat < ApplicationRecord
  belongs_to :room

  validates :text, :room_id, presence: true
end
