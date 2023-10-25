// mentoringController.js
const BppModel = require('../Models/MentorModel'); // Import the Mongoose model

// Controller function to handle the 'on_search' request
const onSearch = async (req, res) => {
  try {
    // Assuming the request body is in req.body
    const requestData = req.body;

    // Create a new document in the MongoDB collection using the Mongoose model
    const bppData = new BppModel(requestData);

    // Save the document to the database
    await bppData.save();

    // Respond with a success message
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { onSearch };
