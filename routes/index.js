const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');
const quotationController = require('../controllers/quotationController');

router.post('/signup',userController.signup);
router.post('/signin',userController.signin);

router.post('/create',passport.authenticate("jwt", { session: false }),quotationController.createQuot);
router.delete('/delete/:userId',passport.authenticate("jwt", { session: false }),quotationController.deleteQuot);
router.put('/update/:userId',passport.authenticate("jwt", { session: false }),quotationController.updateQuot);
router.get('/getAll',passport.authenticate("jwt", { session: false }),quotationController.getAllQuot);

module.exports = router;