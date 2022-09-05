const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
 } = require('../../controllers/thought-controller');

 
 // /api/thoughts
router.route('/')
      .get(getAllThoughts)
      .post(createThought);

//  /api/thoughts/:id
router
      .route('/:id')
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought)


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
      .post(addReaction)
      .delete(deleteReaction);

      

module.exports = router;

