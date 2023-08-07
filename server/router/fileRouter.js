const Router = require('express').Router;
const controller = require('../controllers/fileControllers');
const router = new Router();
router.post('/postfile', controller.postFile);
router.post('/getfiles', controller.getAllFiles);
router.post('/getfiletext', controller.getText);
router.post('/updatefile', controller.updateFile);
module.exports = router;
