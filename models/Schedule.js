const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event_title: {
    type: String,
    required: true
  },
  event_description: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  event_type: {
    type: String,
    enum: ['class', 'meeting', 'exam', 'personal'],
    required: true
  },
  is_recurring: {
    type: Boolean,
    default: false
  },
  recurrence_pattern: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema); 