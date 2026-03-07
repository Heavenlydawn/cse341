const router = require('express').Router();
const contactController = require('../controllers/contactController.js')

// Get all contact route
// #swagger.tags=['Contacts']
router.get('/', contactController.getAllContacts);

// Get a single contact
// #swagger.tags=['Contacts']
router.get('/:id', contactController.getContactByID);

// Add a contact
// #swagger.tags=['Contacts']
router.post('/', contactController.createContact);

// Update a contact
// #swagger.tags=['Contacts']
router.put('/:id', contactController.updateContact);

// Delete a contact
// #swagger.tags=['Contacts']
router.delete('/:id', contactController.deleteContact);


module.exports = router; 