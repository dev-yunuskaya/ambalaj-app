import { useEffect, useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import { useCalculationStore } from "../store/useCalculationStore";

const priceGroups = [
  {
    title: "Kağıt Cinsi",
    items: [
      { key: "bristol", label: "Bristol (TL/kg)" },
      { key: "chrome", label: "Krome (TL/kg)" },
      { key: "glossy", label: "Kuşe (TL/kg)" },
      { key: "firstPulp", label: "1. Hamur (TL/kg)" },
      { key: "enzo", label: "Enzo (TL/kg)" },
      { key: "craft", label: "Kraft (TL/kg)" },
    ],
  },
  {
    title: "Baskı",
    items: [
      { key: "firstThousandBigPrinting", label: "Büyük İlk 1000 (TL)" },
      {
        key: "afterThousandBigPrinting",
        label: "Büyük Sonraki 1000 (TL)",
      },
      { key: "firstThousandMediumPrinting", label: "Orta İlk 1000 (TL)" },
      {
        key: "afterThousandMediumPrinting",
        label: "Orta Sonraki 1000 (TL)",
      },
      { key: "firstThousandSmallPrinting", label: "Küçük İlk 1000 (TL)" },
      {
        key: "afterThousandSmallPrinting",
        label: "Küçük Sonraki 1000 (TL)",
      },
    ],
  },
  {
    title: "Selefon",
    items: [
      { key: "silver", label: "Gümüş (TL/m²)" },
      { key: "gold", label: "Gold (TL/m²)" },
      { key: "opaque", label: "Mat (TL/m²)" },
      { key: "bright", label: "Parlak (TL/m²)" },
      { key: "pearl", label: "Sedef (TL/m²)" },
    ],
  },
  {
    title: "Kesim",
    items: [
      { key: "firstThousandBigCutting", label: "Büyük İlk 1000 (TL)" },
      {
        key: "afterThousandBigCutting",
        label: "Büyük Sonraki 1000 (TL)",
      },
      { key: "firstThousandSmallCutting", label: "Küçük İlk 1000 (TL)" },
      {
        key: "afterThousandSmallCutting",
        label: "Küçük Sonraki 1000 (TL)",
      },
    ],
  },
  {
    title: "Yapıştırma",
    items: [
      {
        key: "firstThousandSidePasting",
        label: "Yan İlk 10000 (TL)",
      },
      {
        key: "afterThousandSidePasting",
        label: "Yan Sonraki 1000 (TL)",
      },
      {
        key: "firstThousandSideBySidePasting",
        label: "Yan Dip İlk 10000 (TL)",
      },
      {
        key: "afterThousandSideBySidePasting",
        label: "Yan Dip Sonraki 1000 (TL)",
      },
    ],
  },
  {
    title: "Normal Lak",
    items: [
      { key: "normalBigFirst", label: "Büyük İlk 1000 (TL)" },
      { key: "normalBigAfter", label: "Büyük Sonraki 1000 (TL)" },
      { key: "normalMediumFirst", label: "Orta İlk 1000 (TL)" },
      { key: "normalMediumAfter", label: "Orta Sonraki 1000 (TL)" },
      { key: "normalSmallFirst", label: "Küçük İlk 1000 (TL)" },
      { key: "normalSmallAfter", label: "Küçük Sonraki 1000 (TL)" },
    ],
  },
  {
    title: "Embos Lak",
    items: [
      { key: "embosBigFirst", label: "Büyük İlk 1000 (TL)" },
      { key: "embosBigAfter", label: "Büyük Sonraki 1000 (TL)" },
      { key: "embosMediumFirst", label: "Orta İlk 1000 (TL)" },
      { key: "embosMediumAfter", label: "Orta Sonraki 1000 (TL)" },
      { key: "embosSmallFirst", label: "Küçük İlk 1000 (TL)" },
      { key: "embosSmallAfter", label: "Küçük Sonraki 1000 (TL)" },
    ],
  },
  {
    title: "Efekt Lak",
    items: [
      { key: "efektBigFirst", label: "Büyük İlk 1000 (TL)" },
      { key: "efektBigAfter", label: "Büyük Sonraki 1000 (TL)" },
      { key: "efektMediumFirst", label: "Orta İlk 1000 (TL)" },
      { key: "efektMediumAfter", label: "Orta Sonraki 1000 (TL)" },
      { key: "efektSmallFirst", label: "Küçük İlk 1000 (TL)" },
      { key: "efektSmallAfter", label: "Küçük Sonraki 1000 (TL)" },
    ],
  },
  {
    title: "Sim Lak",
    items: [
      { key: "simBig", label: "Büyük (TL)" },
      { key: "simMedium", label: "Orta (TL)" },
      { key: "simSmall", label: "Küçük (TL)" },
    ],
  },
];

const PriceScreen = () => {
  const store = useCalculationStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // İlk açılışta localStorage'den fiyatları yükle
  useEffect(() => {
    store.loadPricesFromStorage();
  }, []);

  // Değer değişince hem store hem localStorage güncellenir
  const handleChange = (key, text) => {
    if (!key) return;
    const value = parseFloat(text) || 0;
    store.setField(key, value);
    localStorage.setItem(key, value.toString());
    setMessage('Fiyat kaydedildi ✅');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Kağıt Fiyatları</h1>

        {message && (
          <div className={`mb-4 p-3 rounded text-center ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {priceGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-blue-800 ml-2">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {group.items.map(({ key, label }) => (
                <CustomTextInput
                  key={key}
                  label={label}
                  value={store[key]?.toString()}
                  onChangeText={(text) => handleChange(key, text)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceScreen;