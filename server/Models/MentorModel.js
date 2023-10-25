const mongoose = require('mongoose');

// Define the schema for 'Mentor' and 'MentorSession' (adjust names as needed)
const mentorSchema = new mongoose.Schema({
  categories: [
    {
      id: String,
      descriptor: {
        code: String,
        name: String,
      },
    },
  ],
  id: String,
  descriptor: {
    code: String,
    name: String,
    short_desc: String,
  },
  items: [
    {
      quantity: {
        available: {
          count: Number,
        },
        allocated: {
          count: Number,
        },
      },
      price: {
        value: String,
      },
      id: String,
      category_ids: [String],
      descriptor: {
        images: [
          {
            url: String,
          },
        ],
        code: String,
        name: String,
        short_desc: String,
        long_desc: String,
      },
      fulfillment_ids: [String],
      tags: [
        {
          display: Boolean,
          descriptor: {
            code: String,
            name: String,
          },
          list: [
            {
              descriptor: {
                code: String,
                name: String,
              },
            },
          ],
        },
      ],
    },
  ],
  fulfillments: [
    {
      language: [String],
      id: String,
      time: {
        range: {
          start: Date,
          end: Date,
        },
        label: String,
      },
      type: String,
      tags: [
        {
          descriptor: {
            code: String,
            name: String,
          },
          list: [
            {
              descriptor: {
                code: String,
                name: String,
              },
            },
          ],
          display: Boolean,
        },
        {
          descriptor: {
            code: String,
            name: String,
          },
          list: [
            {
              descriptor: {
                code: String,
                name: String,
              },
            },
          ],
          display: Boolean,
        },
      ],
      agent: {
        person: {
          name: String,
          id: String,
        },
      },
      tracking: Boolean,
    },
  ],
});

const contextSchema = new mongoose.Schema({
    domain: String,
    version: String,
    action: String,
    bap_id: String,
    bap_uri: String,
    transaction_id: String,
    message_id: String,
    ttl: String,
    timestamp: Date,
  });
  
  // Define the sub-schema for 'responses'
  const responseSchema = new mongoose.Schema({
    context: contextSchema,
    message: {
      catalog: mentorSchema, // Assuming you want to embed the 'mentor' schema here
    },
  });
  
  // Define the main schema for 'BPP'
  const bppSchema = new mongoose.Schema({
    context: contextSchema,
    responses: [responseSchema], // Responses can be an array of 'response' documents
  });
  
  // Define the model
  const BppModel = mongoose.model('BPP', bppSchema);
  
  module.exports = BppModel;