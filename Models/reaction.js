const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: string,
      required: true,
      maxLength: 280
    },
    username: {
        type: string,
        required: true,
      },
    createdAt: {
        type: Date.now,
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