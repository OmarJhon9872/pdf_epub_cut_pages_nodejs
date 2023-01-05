const express = require('express');
const router = express.Router();

const {get_pdf_pages_controller} = require('../controllers/get_pdf_pages_controller');

router
    .route('/upload_name/:range/:name_pdf')
    .get( get_pdf_pages_controller);


module.exports = router;