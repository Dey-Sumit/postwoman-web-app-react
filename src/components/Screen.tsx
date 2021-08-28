import { useState } from "react";
import RequestSection from "./RequestSection";
import ResponseSection from "./ResponseSection";

const Screen = () => {
  const [responseContent, setResponseContent] = useState(JSON.stringify({}, null, 2));
  const [responseTime, setResponseTime] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  return (
    <div className="grid grid-cols-8  w-full h-full py-2 space-x-3">
      <RequestSection
        setResponseContent={setResponseContent}
        setResponseTime={setResponseTime}
        setStatusCode={setStatusCode}
      />
      <ResponseSection
        responseTime={responseTime}
        responseContent={responseContent}
        statusCode={statusCode}
      />
    </div>
  );
};

export default Screen;
