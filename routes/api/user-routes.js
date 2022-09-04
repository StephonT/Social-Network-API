const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    deleteFriend,
} = require('../../controllers/user-controller');

//  /api/users
router.route('/')
      .get(getAllUsers)


//  /api/users/:id
router.route('/:userid')
      .get(getUserById)
      .put(updateUser)
      .delete(deleteUser)


//  /api/users/
router.route('/')