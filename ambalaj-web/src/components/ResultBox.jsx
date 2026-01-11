const ResultBox = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-black dark:text-white">📄 Kağıt Ağırlığı (gr):</span>
          <span className="text-black dark:text-white">{result.totalWeight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">🧾 Kağıt Fiyatı:</span>
          <span className="text-black dark:text-white">{result.paperPrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">📦 Toplam Kağıt Fiyatı:</span>
          <span className="text-black dark:text-white">{result.totalPaper} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">🖨️ Baskı:</span>
          <span className="text-black dark:text-white">{result.printingPrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">🎀 Selefon:</span>
          <span className="text-black dark:text-white">{result.cellophanePrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">✨ Lak:</span>
          <span className="text-black dark:text-white">{result.lakPrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">✂️ Kesim:</span>
          <span className="text-black dark:text-white">{result.cuttingPrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">🩹 Yapıştırma:</span>
          <span className="text-black dark:text-white">{result.pastingPrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black dark:text-white">💰 Kutu Başına:</span>
          <span className="text-black dark:text-white">{result.unitPrice} TL</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span className="text-black dark:text-white">🧾 Toplam Fiyat:</span>
          <span className="text-black dark:text-white">{result.totalPrice} TL</span>
        </div>
      </div>
    </div>
  );
};

export default ResultBox;