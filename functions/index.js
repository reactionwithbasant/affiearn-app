const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.vCommissionPostback = functions.https.onRequest(async (req, res) => {
  const { click_id, amount, status, txn } = req.query;
  try {
    await admin.database().ref("/conversions/" + txn).set({
      click_id,
      amount: parseFloat(amount) || 0,
      status,
      timestamp: Date.now()
    });
    res.status(200).send("Postback received successfully");
  } catch (error) {
    res.status(500).send("Error saving data");
  }
});
