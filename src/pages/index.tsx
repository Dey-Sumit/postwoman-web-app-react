import RequestScreen from "@components/RequestScreen";
import Tabs from "@components/Tabs";
import { useState } from "react";

interface Pair {
  id: number;
  key: string;
  value: string;
}

export default function Home() {
  // const [requests, setRequests] = useState(data);

  return (
    <div className="h-screen p-6 ">
      <div className="border border-gray-600">
        <Tabs />
        <RequestScreen />
      </div>
    </div>
  );
}
