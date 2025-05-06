// controllers/devoteeController.js
const User = require('../models/user');
const PriestProfile = require('../models/priestProfile');
const Booking = require('../models/booking');

// Search for priests
exports.searchPriests = async (req, res) => {
  try {
    // Demo data for testing
    const priests = [
      {
        _id: '1',
        name: 'Dr. Rajesh Sharma',
        experience: 25,
        religiousTradition: 'Hinduism',
        ceremonies: ['Wedding', 'Grih Pravesh', 'Baby Naming'],
        profilePicture: '',
        ratings: {
          average: 4.9,
          count: 120
        },
        availability: 'available'
      },
      {
        _id: '2',
        name: 'Pandit Arun Kumar',
        experience: 18,
        religiousTradition: 'Hinduism',
        ceremonies: ['Satyanarayan Katha', 'Festival Pujas', 'Baby Naming'],
        profilePicture: '',
        ratings: {
          average: 4.8,
          count: 95
        },
        availability: 'busy'
      }
    ];

    res.status(200).json(priests);
  } catch (error) {
    console.error('Search priests error:', error);
    res.status(500).json({
      message: 'Server error while searching for priests'
    });
  }
};

// Get priest details
exports.getPriestDetails = async (req, res) => {
  try {
    const { priestId } = req.params;

    // Demo data for testing
    const priest = {
      _id: priestId,
      name: 'Dr. Rajesh Sharma',
      experience: 25,
      religiousTradition: 'Hinduism',
      templesAffiliated: [{
        name: 'Shri Siddhivinayak Temple',
        address: 'Mumbai, Maharashtra'
      }],
      ceremonies: ['Wedding', 'Grih Pravesh', 'Baby Naming', 'Satyanarayan Katha'],
      description: 'With 25 years of experience, I specialize in conducting various religious ceremonies with precision and devotion.',
      profilePicture: '',
      ratings: {
        average: 4.9,
        count: 120
      },
      availability: 'available',
      priceList: {
        'Wedding': 15000,
        'Grih Pravesh': 8000,
        'Baby Naming': 5000,
        'Satyanarayan Katha': 11000,
        'default': 8000
      },
      ceremonyCount: 200
    };

    res.status(200).json(priest);
  } catch (error) {
    console.error('Get priest details error:', error);
    res.status(500).json({
      message: 'Server error while fetching priest details'
    });
  }
};

// Create a booking (simplified)
exports.createBooking = async (req, res) => {
  try {
    // Demo response
    const booking = {
      _id: Math.random().toString(36).substring(2, 10),
      ...req.body,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date()
    };

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      message: 'Server error while creating booking'
    });
  }
};