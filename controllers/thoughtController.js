const { User, Thought } = require('../models');


const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
    .sort({ createdAt: -1 })
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: {thoughts: thought._id }},
            { new: true }
        )
      }) 
      .then ((user) => {
        !user
            ? res.status(404).json({message: "no user with that id"})
            : res.json({message: 'thought successfully created'})
      }) 
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
   Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true, new: true}
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },
  
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : User.findOneAndUpdate(
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
          )

      )
      .then((user) => {
       !user
        ? res.status(404).json({ message: 'No such user exists' })
        : res.json({message:'thought Deleted'})
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} }},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController