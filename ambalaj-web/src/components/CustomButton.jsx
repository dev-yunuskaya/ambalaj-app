const CustomButton = ({onReset, onCalculate}) => {
  return (
    <div className="w-full h-12 flex justify-around items-center my-4">
      <button
        className="w-24 h-10 border border-gray-300 rounded bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
        onClick={onReset}
      >
        Sıfırla
      </button>
      <button
        className="w-24 h-10 border border-gray-300 rounded bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
        onClick={onCalculate}
      >
        Hesapla
      </button>
    </div>
  );
};

export default CustomButton;