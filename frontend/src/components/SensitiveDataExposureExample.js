import React from "react";
import AddCard from "./AddCard";
import CardInfo from "./CardInfo";

function SensitiveDataExposureExample() {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-full text-center gap-y-4 mt-12">
      <div
        style={{ width: "800px" }}
        className="text-neutral-800 text-m text-start flex flex-col"
      >
        <strong>INSTRUCTIONS:</strong>
        This feature allows you to enter and then retrieve card information by
        pressing the Get Card Info button.
        <br />
        When the Enable Vulnerability checkbox is selected, the data is stored
        and displayed without encryption; otherwise, it is protected. This
        demonstrates the security concept of Sensitive Data Exposure.
        <br />
        <br />
        <div>Here’s a sample card you can use for testing: </div>
        <div className="flex gap-1">
          <strong>Card Number: </strong> 1111 1111 1111 1111 <br />
        </div>
        <div className="flex gap-1">
          <strong>Expiration Date: </strong> 11/11 <br />
        </div>
        <div className="flex gap-1">
          <strong>CCV: </strong> 111
        </div>
      </div>
      <AddCard />
      <CardInfo />
    </div>
  );
}

export default SensitiveDataExposureExample;
