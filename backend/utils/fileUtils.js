const fs = require('fs-extra');

async function readData(filePath) {
  try {
    await fs.ensureFile(filePath);
    const data = await fs.readJson(filePath, { throws: false });
    return data || [];
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

async function writeData(filePath, data) {
  try {
    await fs.writeJson(filePath, data, { spaces: 2 });
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

module.exports = { readData, writeData };
