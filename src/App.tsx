import "./App.css";
import AutoComplete from "./components/AutoComplete";
import CustomLoader from "./components/Loader";

function App() {
  const fetchSuggestions = async (query: string): Promise<string[]> => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Server Error : Cannto fetch the response");
    }
    const result = await response.json();
    return result.recipes;
  };

  const handleOnSelect = (value: string) => {
    console.log(value);
  };
  return (
    <div className="app">
      <h1>Typeahead Component</h1>
      <AutoComplete
        placeholder="Enter Receipe"
        fetchSuggesions={fetchSuggestions}
        dataKey="name"
        customLoading={<CustomLoader />}
        onSelect={handleOnSelect}
        onChange={(e: string) => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
