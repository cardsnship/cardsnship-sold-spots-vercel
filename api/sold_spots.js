const fetch = require('node-fetch');
const { parse } = require('csv-parse/sync');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZ5T19xvCgbLjSqqpwaeA2lnUgJHvDjcAKRfKmIWsNFgJ1X4t9g-mY-UvAfrKOBnoCvwnBrf83Rhov/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(sheetUrl);
    const text = await response.text();

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
    });

    const output = {};
    records.forEach(row => {
      if (row['Buyer Username']) {
        output[row.ID] = row['Buyer Username'];
      }
    });

    res.status(200).json(output);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch or parse sheet' });
  }
};
