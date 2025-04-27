const express = require('express');
const router = express.Router();

const feedback = require('./feedbackRoutes');
// const prodcutRoutes = require('./productRoutes');
// const orderRoutes = require('./orderRoutes');

router.use('/feedback', feedback);
// router.use('/products',prodcutRoutes);
// router.use('/orders', orderRoutes);

module.exports = router;