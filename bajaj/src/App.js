import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    document.title = "21BAI1155";
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const result = await axios.post("http://localhost:5000/bfhl", {
        data: parsedInput,
      });
      setResponse(result.data);
      setFilteredData([]);
    } catch (error) {
      console.error(error);
      alert("Invalid JSON format or error processing the request");
    }
  };

  const handleFilter = () => {
    const filtered = dropdownOptions.reduce((acc, option) => {
      if (option === "Alphabets") {
        acc = acc.concat(response.alphabets || []);
      }
      if (option === "Numbers") {
        acc = acc.concat(response.numbers || []);
      }
      if (option === "Highest lowercase alphabet") {
        acc = acc.concat(response.highest_lowercase_alphabet || []);
      }
      return acc;
    }, []);
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>21BAI1155</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <label htmlFor="dropdown">Choose filter options:</label>
          <select
            id="dropdown"
            multiple
            value={dropdownOptions}
            onChange={(e) =>
              setDropdownOptions(
                [...e.target.selectedOptions].map((option) => option.value)
              )
            }
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
          <button onClick={handleFilter}>Apply Filter</button>
        </>
      )}

      <div>
        {filteredData.length > 0 && (
          <div>Filtered Data: {filteredData.join(", ")}</div>
        )}
      </div>
    </div>
  );
};

export default App;
