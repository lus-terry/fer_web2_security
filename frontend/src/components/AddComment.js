import React, { useState } from "react";

function AddComment() {
  const [comment, setComment] = useState("");
  const [xssEnabled, setXssEnabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting comment:", comment);
    console.log("XSS enabled:", xssEnabled);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/comments?xss=${xssEnabled}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      const result = await response.json();
      console.log("Server response after submit:", result);

      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div style={{ width: "600px" }}>
      <div className="flex items-center justify-center">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={xssEnabled}
            onChange={() => {
              setXssEnabled(!xssEnabled);
            }}
            className="form-checkbox"
          />
          <span>Enable XSS</span>
        </label>
      </div>
      <div className="bg-white w-full mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col  items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              className="text-neutral-800 font-bold text-m text-center mb-2 block"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter a comment"
            />
          </div>
          <button
            style={{ width: "150px" }}
            type="submit"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Submit comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
