const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const quotationController = require('../controllers/quotationController');

router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.post('/create',quotationController.createQuot);
router.delete('/delete/:userId',quotationController.deleteQuot);
router.put('/update/:userId',quotationController.updateQuot);

module.exports = router;