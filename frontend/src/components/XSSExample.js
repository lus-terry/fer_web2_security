import React from "react";
import Comments from "./Comments";

function XSSExample() {
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

  const examples = [
    `<button onclick="alert('XSS Button')">Click Me</button>`,
    `<img src="x" onerror="alert('XSS Image')"/>`,
    `<a href="#" onmouseover="alert('XSS via hover!')">Hover over this link</a>`,
  ];

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full text-center gap-y-4 mt-12">
      <div
        style={{ width: "800px" }}
        className="text-neutral-800 text-m text-start flex flex-col"
      >
        <strong>INSTRUCTIONS</strong>
        This feature allows you to enter comments, which are displayed
        immediately below.
        <br />
        When the Enable Vulnerability checkbox is selected, scripts in comments
        are not sanitized and may execute,
        <br />
        while without it, comments are sanitized and shown as plain text.
        <br />
        This demonstrates the security concept of Cross-Site Scripting (XSS).
        <br />
        <br />
        <div>You can test with these example scripts:</div>
        <div className="flex flex-col mt-4">
          {examples.map((example, index) => (
            <pre
              key={index}
              dangerouslySetInnerHTML={{ __html: escapeHTML(example) }}
            />
          ))}
        </div>
      </div>
      <Comments />
    </div>
  );
}

export default XSSExample;
