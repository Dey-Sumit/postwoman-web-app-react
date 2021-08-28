import Screen from "@components/Screen";
import Tabs from "@components/Tabs";

export default function Home() {
  return (
    // PADDING added here
    <div className="h-screen p-6 font-serif text-white bg-gray-900 ">
      <Tabs />
      <Screen />
    </div>
  );
}
