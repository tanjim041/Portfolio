const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read data from portfolio.json
const getPortfolioData = () => {
  const dataPath = path.join(__dirname, '../data/portfolio.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Home Route
router.get('/', (req, res) => {
  try {
    const data = getPortfolioData();
    res.render('index', { data });
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    res.status(500).send("Error loading portfolio data.");
  }
});

module.exports = router;
