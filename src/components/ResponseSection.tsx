import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { useEffect, useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import RingLoader from "@public/RingLoader.svg";
import Image from "next/image";
if (typeof navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
}

const ResponseSection = ({ responseContent, responseTime, statusCode }) => {
  return (
    <div className="h-full col-span-full md:col-span-3 ">
      <div className="flex flex-col justify-start w-full px-2 space-y-3 ">
        {/* header */}
        <div className="flex items-center justify-between">
          <span>Status : {statusCode}</span>
          <span>Time : {responseTime || 0}s</span>
          <span>Size : 865b</span>
        </div>
        <div className="flex items-center space-x-6">
          {/* tabs */}
          <button>Body</button>
          <button>Cookies</button>
          <button>Headers</button>
          <button>Tests</button>
        </div>
      </div>

      {/* body */}
      <Image src={RingLoader} alt="loader" width={50} height={50} />

      <div className="">
        <ControlledEditor
          onBeforeChange={() => {}}
          value={responseContent}
          className=" code-mirror-wrapper"
          options={{
            lineWrapping: true,
            theme: "material",
            lineNumbers: true,
            mode: {
              name: "javascript",
              json: true,
              statementIndent: 4,
              indentUnit: 10,
            },
            readOnly: true,
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
};

export default ResponseSection;
