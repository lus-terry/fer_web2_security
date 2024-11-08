const { Pool } = require("pg");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const query = (text, params) => pool.query(text, params);

function escapeHTML(str) {
  return str.replace(/[&<>"'`\/\\]/g, function (char) {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "`":
        return "&#x60;";
      case "/":
        return "&#x2F;";
      case "\\":
        return "&#x5C;";
      default:
        return char;
    }
  });
}

const addComment = async (rawComment, xssEnabled) => {
  let comment = rawComment;
  if (!xssEnabled) {
    comment = escapeHTML(rawComment);
  }
  await pool.query("INSERT INTO comments (comment) VALUES ($1)", [comment]);
  return { message: "Comment saved" };
};

const getComments = async () => {
  const result = await pool.query("SELECT * FROM comments");
  return result.rows;
};

const addOrReplaceCardWithEncrypt = async (cardNumber, expirationDate, cvv) => {
  let storedCardNumber = cardNumber;
  let storedExpirationDate = expirationDate;
  let storedCvv = cvv;

  const saltRounds = 10;
  storedCardNumber = await bcrypt.hash(cardNumber, saltRounds);
  storedExpirationDate = await bcrypt.hash(expirationDate, saltRounds);
  storedCvv = await bcrypt.hash(cvv, saltRounds);

  const existingCard = await pool.query("SELECT * FROM card_data LIMIT 1");

  if (existingCard.rows.length > 0) {
    await pool.query("DELETE FROM card_data");
  }

  await pool.query(
    "INSERT INTO card_data (card_number, expiration_date, cvv) VALUES ($1, $2, $3)",
    [storedCardNumber, storedExpirationDate, storedCvv]
  );

  return { message: "Card is added." };
};

const addOrReplaceCard = async (cardNumber, expirationDate, cvv) => {
  const existingCard = await pool.query("SELECT * FROM card_data LIMIT 1");

  if (existingCard.rows.length > 0) {
    await pool.query("DELETE FROM card_data");
  }

  await pool.query(
    "INSERT INTO card_data (card_number, expiration_date, cvv) VALUES ($1, $2, $3)",
    [cardNumber, expirationDate, cvv]
  );

  return { message: "Card is added." };
};

const getCard = async () => {
  const result = await pool.query("SELECT * FROM card_data LIMIT 1");
  if (result.rows.length === 0) {
    return { message: "No card info available." };
  }
  return result.rows[0];
};

module.exports = {
  addOrReplaceCard,
  addOrReplaceCardWithEncrypt,
  getCard,
  addComment,
  getComments,
  clearComments,
  query,
  pool,
};
