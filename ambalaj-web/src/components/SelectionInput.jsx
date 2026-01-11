import { useState, useEffect } from "react";

const SelectionInput = ({ label, options, value, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (e) => {
    const itemValue = e.target.value;
    setSelectedValue(itemValue);
    onValueChange(itemValue);
  };

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between items-center p-2 border border-gray-300 rounded">
        <span className="text-sm flex-1 text-black dark:text-white">{label}</span>
        <select
          value={selectedValue || ''}
          onChange={handleChange}
          className="flex-1 p-1 border border-gray-200 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectionInput;