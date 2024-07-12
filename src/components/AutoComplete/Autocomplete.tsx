/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import SuggestionList from "./SuggestionList";
import { AutocompleteProps, ChangeEventType } from "./types";
import debounce from "lodash/debounce";

import "./autocomplete.css";

const AutoComplete = ({
  placeholder = "Search...",
  fetchSuggesions,
  dataKey,
  customLoading,
  onChange,
  onBlur,
  onSelect,
  onFocus,
  customStyles = {},
  staticData = [],
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<{}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleInputChange = (event: ChangeEventType) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query: string) => {
    setLoading(true);
    try {
      let result: {}[];
      if (staticData.length > 1) {
        result = staticData.filter((item: string) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
        setSuggestions(result);
      } else {
        result = await fetchSuggesions(query);
        setSuggestions(result);
      }
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: any) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        style={customStyles}
        onBlur={onBlur}
        onChange={(event) => handleInputChange(event)}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {(loading || suggestions.length > 0 || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList
            suggestions={suggestions}
            highlight={inputValue}
            dataKey={dataKey}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
