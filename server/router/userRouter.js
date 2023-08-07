const Router = require('express').Router;
const controller = require('../controllers/userControllers')
const router = new Router();
// router.get('/', controller.redirectToLogin)
router.post('/registration', controller.registration);
router.post('/login', controller.login);
// router.get('/:login', controller.getinfo);
module.exports = router