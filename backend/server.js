const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  addOrReplaceCard,
  getCard,
  addOrReplaceCardWithEncrypt,
} = require("./db");
const { addComment, getComments } = require("./db");

dotenv.config();

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Security app is running.");
});

app.get("/credit-card-info", (req, res) => {
  res.json(creditCardInfo);
});

app.post("/add-card", async (req, res) => {
  const { cardNumber, expirationDate, cvv, encrypt } = req.body;

  try {
    let result;
    if (!encrypt) {
      result = await addOrReplaceCardWithEncrypt(
        cardNumber,
        expirationDate,
        cvv
      );
    } else {
      result = await addOrReplaceCard(cardNumber, expirationDate, cvv);
    }

    res.status(200).send({ message: "Card successfully saved!" });
  } catch (error) {
    res.status(500).send({ message: "Error saving card data." });
  }
});

app.get("/get-card", async (req, res) => {
  try {
    const card = await getCard();
    res.status(200).send(card);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving card data." });
  }
});

app.post("/comments", async (req, res) => {
  const { comment } = req.body;
  const xssEnabled = req.query.xss === "true";

  try {
    const result = await addComment(comment, xssEnabled);
    console.log("Comment saved:", result);
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Error saving comment." });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await getComments();
    console.log("Fetched comments:", comments);
    res.setHeader("Content-Type", "application/json");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});


if (externalUrl) {
  const hostname = "0.0.0.0";
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and externally on ${externalUrl}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}