const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;