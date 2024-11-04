const express = require('express');
const Case = require('../models/case');
exports.getCasesByCity = async (req, res) => {
  try {
    const { city, startDate, endDate } = req.query;
    const filter = {};

    if (city) {
      filter.city = new RegExp(`^${city}$`, 'i'); 
    }
    

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    
    const aggregatedData = await Case.aggregate([
      { $match: filter },
      { $group: { _id: '$city', totalCases: { $sum: 1 } } },
    ]);

    res.json(aggregatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
