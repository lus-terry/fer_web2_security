import React, { useState } from "react";

function AddCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [encrypt, setEncrypt] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = {
      cardNumber,
      expirationDate,
      cvv,
      encrypt,
    };

    try {
      const response = await fetch("http://localhost:5000/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      const data = await response.json();
      alert(data.message);
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "600px" }}>
      <div className="flex items-center justify-center">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={encrypt}
            onChange={() => setEncrypt(!encrypt)}
            className="form-checkbox"
          />
          <span>Enable vulnerability</span>
        </label>
      </div>
      <div className="bg-white w-full mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col  items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label class="text-neutral-800 font-bold text-m text-center mb-2 block">
              Add card
            </label>
          </div>
          <div class="mb-4">
            <label class="text-neutral-800 font-bold text-sm text-left mb-2 block">
              Card number:
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              class="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
              maxlength="19"
              placeholder="XXXX XXXX XXXX XXXX"
            />
          </div>
          <div class="flex gap-x-2 mb-4">
            <div class="block">
              <label class="text-neutral-800 text-left font-bold text-sm mb-2 block">
                Exp. date:
              </label>
              <input
                id="expDate"
                type="text"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
                class="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                maxlength="5"
                placeholder="MM/YY"
              />
            </div>
            <div class="block">
              <label class="text-neutral-800 text-left font-bold text-sm mb-2 block">
                CCV:
              </label>
              <input
                id="ccvNumber"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                class="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                maxlength="3"
                placeholder="123"
              />
            </div>
          </div>

          <button
            style={{ width: "150px" }}
            type="submit"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCard;
