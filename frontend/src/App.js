import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "ABCD123"; // Set roll number as title
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://test1-7jjf.onrender.com/bfhl",
        parsedJson
      );
      setResponseData(res.data);
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Input</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder='{"data": ["A", "C", "z"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <h3>Select Fields to Display:</h3>
          <Select options={options} isMulti onChange={setSelectedOptions} />

          <h3>Response Data:</h3>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                selectedOptions.map(({ value }) => [value, responseData[value]])
              ),
              null,
              2
            )}
          </pre>
        </>
      )}
    </div>
  );
};

export default App;
