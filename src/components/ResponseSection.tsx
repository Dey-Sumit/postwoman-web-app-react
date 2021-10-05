import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import RingLoader from "@public/RingLoader.svg";
import Image from "next/image";
import { useLayoutState } from "src/context/layout.context";
if (typeof navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
}

const ResponseSection = () => {
  const { responseLoading, requestScreens, activeRequestScreenId } = useLayoutState();
  const activeRequestScreenIndex = requestScreens.findIndex(
    (requestScreen) => requestScreen.id === activeRequestScreenId
  );

  const requestScreen = requestScreens[activeRequestScreenIndex];
  const {
    responseData: { content, size, statusCode, time },
  } = requestScreen;

  return (
    <div className=" overflow-y-auto border-gray-700 border h-[24rem]">
      <div className="flex justify-between w-full p-2 pr-8 border-b border-gray-600 ">
        {/* header */}
        <div className="flex items-center space-x-6">
          {/* tabs */}
          <button>Body</button>
          <button>Cookies</button>
          <button>Headers</button>
          <button>Tests</button>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <span>Status : {statusCode}</span>
          <span>Time : {time || 0}s</span>
          <span>Size : 865b</span>
        </div>
      </div>

      {/* body */}
      {responseLoading ? (
        <div className="grid h-full place-items-center">
          <Image src={RingLoader} alt="loader" width={50} height={50} className="mx-auto border" />
        </div>
      ) : (
        <div className="">
          <ControlledEditor
            onBeforeChange={() => {}}
            value={content}
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
      )}
    </div>
  );
};

export default ResponseSection;
