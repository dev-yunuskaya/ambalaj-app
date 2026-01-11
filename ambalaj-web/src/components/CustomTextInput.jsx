const CustomTextInput = ({ label, value, onChangeText, width = "w-full" }) => {
  return (
    <div className={`${width} h-12 border border-gray-300 rounded flex justify-between p-1 mb-1`}>
      <div className="flex-3 flex items-center">
        <span className="text-sm text-black dark:text-white">{label}</span>
      </div>
      <div className="flex-2 flex items-center justify-center bg-blue-100">
        <input
          type="number"
          step="0.01"
          value={value || ''}
          onChange={(e) => onChangeText(e.target.value)}
          className="w-full text-center bg-transparent border-none outline-none text-black dark:text-white"
        />
      </div>
    </div>
  );
};

export default CustomTextInput;