const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const moment = require('moment');

// Load credentials from the service account key file
// const creds = JSON.parse(fs.readFileSync('./google-credentials.json'));
const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS);

// Initialize auth
const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const pushToGoogleSheet = async (data) => {
  try {
    console.log("Headers:", data[0]);
    console.log("Initializing GoogleSpreadsheet...");
    const doc = new GoogleSpreadsheet('1vodrUJ5OkQWMYcT7nKgYkmh3xatIUVGzgusTLTHYhhQ', serviceAccountAuth);

    console.log("Loading document info...");
    await doc.loadInfo();

    console.log("Accessing the first worksheet...");
    const sheet = doc.sheetsByIndex[0];


 // Fetch the first row to check for headers
 const firstRow = await sheet.getRows({ limit: 1 });

 // If there's no data in the first row, set the headers
 if (!firstRow.length || !firstRow[0]._rawData.length) {
   console.log("Setting headers...");
   await sheet.setHeaderRow(data[0]);
 }




// // Set the headers
// console.log("Setting headers...");
// await sheet.setHeaderRow(data[0]);



    // Append the rows (assuming headers already exist)
    if (data.length > 1) {
      await sheet.addRows(data.slice(1));
    }

  } catch (error) {
    console.log("Error encountered:", error.message);
  }
};





module.exports = pushToGoogleSheet;
