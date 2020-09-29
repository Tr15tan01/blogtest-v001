const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const regController = require('../controllers/regcontroller');
const isAuthenticated = require('../middleware/authcontroll');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.get('/', regController.getIndex);

router.get('/about', regController.getAbout)

router.get('/register', regController.getRegister);

router.post('/register', regController.postRegister);

router.get('/login', regController.getLogin);

router.post('/login', regController.postLogin);

router.get('/post', regController.getPost);

router.get('/cms', isAuthenticated, regController.getCms);

router.post('/cms', isAuthenticated, regController.uploadImage, regController.postCms);

router.get('/cms1', regController.getCms1);

router.post('/cms1', regController.uploadImage, regController.postCms1);

router.get('/logout', regController.getLogOut)


module.exports = router;
