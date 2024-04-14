const Contact = require('../models/contactModel');


// Insert contact into the database
exports.contact = async (req, res) => {
  const { name, email, phone, msg } = req.body;

  try {
    // Create a new contact instance
    const newContact = new Contact({ name, email, phone, msg });

    // Save the contact to the database
    await newContact.save();

    return res.status(201).json({ message: 'Your message sent successfully' });
  } catch (error) {
    console.error('Error inserting contact:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all contacts
exports.getAllContact = async (req, res) => {
  try {
    // Get all contacts from the database
    const contacts = await Contact.find();

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error('Error getting contacts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update the status of the answer in the database
exports.changeAnswerStatus = async (req, res) => {
  const { id } = req.params;

  try {
    // Update the status of the answer
    const updateResult = await Contact.updateOne({ _id: id }, { status: 'Answered' });

    // Check if the update operation affected any documents
    if (updateResult.nModified > 0) {
      return res.status(200).json({ message: 'Answer status updated successfully' });
    } else {
      return res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    console.error('Error updating answer status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
// single content 
exports.singleContact = async (req, res) => {
  const { id } = req.params; // Use req.params to get the id from URL parameters

  try {
    // Find a single contact by id in the database
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    return res.status(200).json({ contact });
  } catch (error) {
    console.error('Error getting single contact:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
