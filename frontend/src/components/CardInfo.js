import React, { useState } from "react";

function CardInfo() {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCardData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-card`);
      if (!response.ok) {
        throw new Error("Error fetching card info.");
      }
      const data = await response.json();
      setCardData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCardData(null);
    }
  };

  return (
    <div style={{ width: "600px" }}>
      <div className="bg-white w-full mx-auto px-4 lg:px-6 py-5 shadow-md rounded-md flex flex-col  items-center justify-center">
        <label class="text-neutral-800 font-bold text-m text-center mb-2 block">
          Card info
        </label>

        <button
          style={{ width: "150px" }}
          onClick={fetchCardData}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold text-sm py-2  rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Get card info
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {cardData && cardData.card_number ? (
          <div className="flex flex-col gap-y-4 items-start w-full">
            <p className="text-left">
              <label class="text-neutral-800 font-bold text-sm text-left mb-1 block">
                Card number:
              </label>
              {cardData.card_number}
            </p>

            <p className="text-left">
              <label class="text-neutral-800 text-left font-bold text-sm mb-1 block">
                Exp. date:
              </label>{" "}
              {cardData.expiration_date}
            </p>
            <p className="text-left">
              <label class="text-neutral-800 text-left font-bold text-sm mb-1 block">
                CCV:
              </label>{" "}
              {cardData.cvv}
            </p>
          </div>
        ) : (
          cardData && <p>{cardData.message}</p>
        )}
      </div>
    </div>
  );
}

export default CardInfo;
