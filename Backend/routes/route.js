const {createUser, loginUser} = require('../controllers/signupController');
const express = require('express');
const router = express.Router();
const {checkUserAuth} = require('../middleware/authMiddleware');

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/{any}',checkUserAuth);


module.exports=router;