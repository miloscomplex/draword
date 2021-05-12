class Chat < ApplicationRecord
  belongs_to :room

  validates :text, :room_id, presence: true
  validates :text, length: { minimum: 3, maximum: 100 }
end
