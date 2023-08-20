import { useState } from "react";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [getData, setData] = useState("");
  const [showData, setShowData] = useState(false);

  const api_key = "AIzaSyDE-LuwhVvfwrMMpq5qhJrcamiOtlFUKxU";

  const onSubmitKeywordForm = async (event) => {
    event.preventDefault();
    const yearAgoData = new Date();
    yearAgoData.setFullYear(yearAgoData.getFullYear() - 1);
    const startDate = yearAgoData;
    const endDate = new Date();
    console.log(startDate, endDate);
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&publishedAfter=${startDate.toISOString()}&publishedBefore=${endDate.toISOString()}&key=${api_key}`
    );
    const data = await response.json();
    console.log(data);
    const responseVolume = data.pageInfo.totalResults;
    const averageDailySearchOfKeyword = responseVolume / 12;
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
      <button type="submit" className="submit-btn">
        Submit
      </button>
      {showData ? (
        <p className="final-text">
          Average daily search keyword volume for "{keyword}" per month ={" "}
          {getData.toFixed(2)}
        </p>
      ) : (
        ""
      )}
    </form>
  );
}

export default App;
