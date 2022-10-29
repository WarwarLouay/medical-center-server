const router = require('express').Router();
const SpecializationController = require('../Controllers/SpecializationController');

router.post('/addspecialization', SpecializationController.addSpecialization);
router.get('/specializations/list', SpecializationController.listSpecializations);
router.get('/specializations/doctor/:id', SpecializationController.listDoctorBySpecializations);
router.get('/specializations/search/:key', SpecializationController.searchSpecializations);

module.exports = router;