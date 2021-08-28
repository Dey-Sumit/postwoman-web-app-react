import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

interface Variable {
  id: number;
  name: string;
  value: string;
  // description:string
}

const Variables = () => {
  const [variables, setVariables] = useState([
    {
      id: Math.floor(Math.random() * 2000),
      name: "",
      value: "",
    },
  ]);
  const addQueryParamField = () => {
    setVariables([
      ...variables,
      {
        id: Math.floor(Math.random() * 2000),
        name: "",
        value: "",
      },
    ]);
  };

  const deleteField = (id: Number) => {
    const updatedPairs = variables.filter((pair) => pair.id !== id);
    setVariables(updatedPairs);
  };

  const updatePair = (event, id: Number, type: "key" | "value") => {
    let tempPairs = [...variables];
    const pairIndex = variables.findIndex((pair) => pair.id === id);
    tempPairs[pairIndex] = { ...tempPairs[pairIndex], [type]: event.target.value };
    setVariables(tempPairs);
  };

  return (
    <div>
      {/* create variables */}
      {variables.map((pair) => (
        <div
          key={pair.id}
          className="relative flex w-full border-[0.5px] border-t-0 items-center border-gray-600"
        >
          <input
            className="border-r border-gray-600 query-inputs"
            type="text"
            placeholder="key"
            value={pair.name}
            onChange={(event) => updatePair(event, pair.id, "key")}
          />
          <input
            className=" query-inputs"
            type="text"
            placeholder="value"
            value={pair.value}
            onChange={(event) => updatePair(event, pair.id, "value")}
          />
          {/* <input className="query-inputs" type="text" placeholder="description" /> */}
          <MdDelete
            onClick={() => deleteField(pair.id)}
            className="absolute text-red-400 cursor-pointer right-2"
          />
        </div>
      ))}
      <button onClick={addQueryParamField} className="mt-2 text-white ">
        <IoMdAdd size={26} className="text-white" />
      </button>
    </div>
  );
};

export default Variables;
