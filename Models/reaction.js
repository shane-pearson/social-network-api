const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateformat(timestamp)
      },
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

module.exports = reactionSchema;