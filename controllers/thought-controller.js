const { Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //Get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    //create thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    //update thought data
    updateThought({ params, body}, res) {
        Thought.update({ _id: params.id}, 
        body,
        { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },

    //create reaction
    addReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
        
    },

    //DELETE /api/thoughts/:id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
        },
        
        // Deleting friend from friend's list 
        deleteReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId }, 
                { $pull: { reactions: { reactionId: params.reactionId }}},
                { new: true }
            )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        }

}


//exporting controller
module.exports = thoughtController;