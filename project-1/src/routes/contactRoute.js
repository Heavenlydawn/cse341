const router = require('express').Router();
const contactController = require('../controllers/contactController.js')

// Get all contact route
router.get('/contacts', contactController.getAllContacts);

// Get a single contact
router.get('/contacts/:id', contactController.getContactByID);

// Add a contact
router.post('/contacts', contactController.createContact);

// Update a contact
router.put('/contacts/:id', contactController.updateContact);

// Delete a contact
router.delete('/contacts/:id', contactController.deleteContact);


module.exports = router; 