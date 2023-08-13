import { useState } from "react";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [startDateInput, setStartDate] = useState("");
  const [endDateInput, setEndDate] = useState("");
  const [getData, setData] = useState("");
  const [showData, setShowData] = useState(false);

  const api_key = process.env.APIKEY;

  const onSubmitKeywordForm = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&publishedAfter=${startDateInput}T00:00:00Z&publishedBefore=${endDateInput}T23:59:59Z&key=${api_key}`
    );
    const data = await response.json();
    const responseVolume = data.pageInfo.totalResults;
    const days =
      Math.floor(
        (new Date(endDateInput) - new Date(startDateInput)) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    const averageDailySearchOfKeyword = responseVolume / days;
    setData(averageDailySearchOfKeyword);
    setShowData(true);
  };

  return (
    <form className="App" onSubmit={onSubmitKeywordForm}>
      <h1>Enter a Keyword</h1>
      <input
        value={keyword}
        autoFocus={true}
        type="text"
        placeholder="Enter a Keyword"
        className="keyword-input"
        onChange={(event) => setKeyword(event.target.value)}
      />
      <label htmlFor="startDate" className="date-text">
        Enter Start Date
      </label>
      <input
        value={startDateInput}
        type="date"
        placeholder="Enter Start Date"
        id="startDate"
        className="keyword-input"
        onChange={(event) => setStartDate(event.target.value)}
      />
      <label htmlFor="endDate" className="date-text">
        Enter End Date
      </label>
      <input
        value={endDateInput}
        type="date"
        placeholder="Enter End Date"
        id="endDate"
        className="keyword-input"
        onChange={(event) => setEndDate(event.target.value)}
      />
      <button type="submit" className="submit-btn">
        Submit
      </button>
      {showData ? (
        <p className="final-text">
          Average daily search keyword volume for "{keyword}" since{" "}
          {endDateInput} = {getData.toFixed(2)} search/day
        </p>
      ) : (
        ""
      )}
    </form>
  );
}

export default App;
