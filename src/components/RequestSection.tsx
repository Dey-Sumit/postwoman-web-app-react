import axios, { AxiosError } from "axios";
import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import QueryParams from "./QueryParams";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
if (typeof navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/addon/edit/closebrackets");
}
//TODO remove this library, add regex from SOverflow
import validUrl from "valid-url";
import { FaSave } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import clientInstance from "utils/apiClient";
import classNames from "classnames";

const options = ["GET", "POST", "PUT", "DELETE", "PATCH"];

//! of no use so far
function isURL(str) {
  var urlRegex = /(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/;

  var url = new RegExp(urlRegex, "i");
  return str.length < 2083 && url.test(str);
}

var cancelTokenSource;

const variables = [
  {
    name: "BASE_URL",
    value: "http://localhost:3000",
  },
  {
    name: "BASE_URL_2",
    value: "http://localhost:3002",
  },
];

// url = "{BASE_URL}/api/todos/";

const getValue = (variableName: string) => variables.find((v) => v.name === variableName)?.value;
const getRawURL = (url: string) => {
  // extract all the variables eg : {BASE_URL} => remove the braces => replace with the values
  return url.replace(/{(.*?)}/gi, (x: string) => getValue(x.substring(1, x.length - 1)));
};

const RequestSection = ({ setResponseContent, setResponseTime, setStatusCode }) => {
  const [pairs, setPairs] = useState([
    {
      id: Math.floor(Math.random() * 2000),
      key: "",
      value: "",
    },
  ]);
  const [codeEditorState, setCodeEditorState] = useState("{\n\t\n}");

  const [currentTab, setCurrentTab] = useState<"Params" | "Headers" | "Tests" | "Body">("Params");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH">("GET");

  const [responseLoading, setResponseLoading] = useState(false);

  const keyValuePairsToObject = () => {
    const obj = {};
    pairs.map((pair) => {
      if (!pair.key) return;
      obj[pair.key] = pair.value;
    });
    return obj;
  };

  // Cancel request
  const cancelRequest = () => {
    cancelTokenSource.cancel();
  };

  const makeRequest = async () => {
    let newUrl: string;
    if (url.search(/{(.*?)}/) === -1) newUrl = url;
    else newUrl = getRawURL(url);

    if (!validUrl.isUri(newUrl)) return;

    setResponseLoading(true);
    cancelTokenSource = axios.CancelToken.source();
    try {
      const response = await clientInstance({
        method: method,
        url: newUrl,
        params: keyValuePairsToObject(),
        data: JSON.parse(codeEditorState),
        cancelToken: cancelTokenSource.token,
      });
      console.log(response);

      setStatusCode(response.status);
      setResponseContent(JSON.stringify(response.data, null, 2));

      //@ts-ignore
      setResponseTime(response.duration / 1000.0); //! FIX response type is not updated on error
    } catch (error) {
      const err: AxiosError = error;
      setStatusCode(err?.response.status || 499);
      //499 Client Closed Request Used when the client has closed the request before the server could send a response.
      console.log(error.response.data.message);
      setResponseContent(err.response?.data?.message || err.message);
    } finally {
      setResponseLoading(false);
    }
  };

  const handleRequestMethod = (type) => {
    setMethod(type.value);
  };

  return (
    <div className="h-auto col-span-full md:col-span-5 md:h-full ">
      {/* header start */}
      <div className="flex items-center space-x-2 ">
        <div className="flex flex-1 ">
          <Dropdown
            options={options}
            onChange={handleRequestMethod}
            value={method}
            placeholder="Select an option"
            className=""
            controlClassName="dropdownControlClass"
          />

          <input
            className="flex-1 px-4 text-white bg-gray-700 outline-none"
            placeholder="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            size={1}
          />
        </div>
        <button
          className={classNames("flex h-10  items-center p-2 px-3 space-x-1 bg-green-600 ", {
            "bg-red-500": responseLoading,
          })}
          onClick={responseLoading ? cancelRequest : makeRequest}
        >
          <RiSendPlaneFill />
          <span className="hidden sm:block">{responseLoading ? "Cancel" : "Send"}</span>
        </button>
        <button className="h-10 px-3 bg-green-600 ">
          <FaSave />
        </button>
      </div>
      {/* header end */}

      {/* body start*/}

      {/* tabs */}
      <div className="flex mt-4 space-x-5 border-b border-gray-500">
        <button className="p-2 focus:outline-none " onClick={() => setCurrentTab("Params")}>
          Params
        </button>
        <button className="p-2 focus:outline-none " onClick={() => setCurrentTab("Headers")}>
          Headers
        </button>
        <button className="p-2 focus:outline-none " onClick={() => setCurrentTab("Body")}>
          Body
        </button>
        <button className="p-2 focus:outline-none " onClick={() => setCurrentTab("Tests")}>
          Tests
        </button>
      </div>

      <div className="my-2">
        {currentTab === "Params" && <QueryParams pairs={pairs} setPairs={setPairs} />}
        {currentTab === "Body" && (
          <ControlledEditor
            onBeforeChange={(editor, data, value) => setCodeEditorState(value)}
            value={codeEditorState}
            className="code-mirror-wrapper"
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
              autoCloseBrackets: true,

              tabSize: 4,
            }}
          />
        )}
      </div>
      {/* body end*/}
    </div>
  );
};

export default RequestSection;
