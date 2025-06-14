const fetch = require('node-fetch');
const { parse } = require('csv-parse/sync');

module.exports = async (req, res) => {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-...';

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
