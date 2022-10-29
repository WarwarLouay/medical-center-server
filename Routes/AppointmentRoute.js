const router = require('express').Router();
const AppointmentController = require('../Controllers/AppointmentController');

router.post('/addappointment', AppointmentController.addAppointment);
router.post('/deleteappointment', AppointmentController.deleteAppointments);
router.post('/list/appointment', AppointmentController.listAppointments);
router.post('/getdate', AppointmentController.getDate);
router.post('/gettime', AppointmentController.getTime);
router.post('/takeappointment', AppointmentController.takeAppointment);
router.post('/gettakedappointment', AppointmentController.getTakedAppointment);

module.exports = router;