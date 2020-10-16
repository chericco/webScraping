const express = require('express')

const search_controller = require('../controllers/searchController')

const router = express.Router()

router.get('/', search_controller.search_googleplay_get)

router.get('/:category', search_controller.search_googleplay_category_get )

module.exports = router