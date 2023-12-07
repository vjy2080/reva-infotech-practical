import React, { useState, useCallback } from 'react';

const api = {
  key: "baImp6Lcwult3QNYNeJyPlNg-2n6wgob4UiXT1rhTrQ", 
  base: "https://geocode.search.hereapi.com/v1/geocode"
};

const SuggestionsList = ({ items, onSelectSuggestion }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const handleSuggestionClick = (index) => {
    onSelectSuggestion(index); 
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => handleSuggestionClick(index)}>
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default function AddressInp({ onChange, onSelectAddress }) {
  const [data, setData] = useState([]);
  const [inpData, setInpData] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [position, setPosition] = useState([]);

  // console.log(position);
  const handleChange = useCallback((e) => {
    const inputValue = e.target.value;
    setInpData(inputValue);
    // setLoading(true);
    setError(null);

    fetch(`${api.base}?q=${inputValue}&limit=4&apiKey=${api.key}`)
      .then(res => res.json())
      .then(result => {
        // setLoading(false);
        if (result.items && result.items.length > 0) {
          setData(result);
        } else {
          setData([]);
        }
      })
      .catch(error => {
        // setLoading(false);
        setError("Error fetching data");
        console.error(error);
      });

    // Call the onChange prop passed from the parent component
    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  const handleSelectSuggestion = useCallback((index) => {
    const selectedSuggestion = data.items[index].title;
    const selectedPosition = data.items[index].position;
    // setPosition(selectedPosition)

    setInpData(selectedSuggestion, selectedPosition);
    setData([]);
    // Call the onSelectAddress prop passed from the parent component
    if (onSelectAddress) {
      onSelectAddress(selectedSuggestion, selectedPosition);
    }
  }, [onSelectAddress, data.items]);

  return (
    <div>
      {error && <p>Error: {error}</p>}

      <input
        type="text"
        name="address"
        value={inpData}
        onChange={handleChange}
        id="address"
      />
      <SuggestionsList items={data.items} onSelectSuggestion={handleSelectSuggestion} />
    </div>
  );
}
