const Subscriber = require('../models/subscriberModel');

// Add a new subscriber
exports.subscriber = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      // Subscriber with this email already exists, return subscriber exists response
      return res.status(409).json({ error: 'Subscriber with this email already exists' });
    }

    // Insert the new subscriber into the database
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    console.log('Subscriber added successfully');
    return res.status(201).json({ message: 'Subscriber added successfully' });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all subscribers
exports.Allsubscriber = async (req, res) => {
  try {
    // Get all subscribers from the database
    const subscribers = await Subscriber.find();

    return res.status(200).json({ subscribers });
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
