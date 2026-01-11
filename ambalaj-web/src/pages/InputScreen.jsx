import { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import SelectionInput from "../components/SelectionInput";
import CustomButton from "../components/CustomButton";
import ResultBox from "../components/ResultBox";
import { useCalculationStore } from "../store/useCalculationStore";
import { calculatePrice } from "../logic/calculatePrice";

const numericInputs = [
  { key: "width", label: "En (cm)", parse: parseFloat },
  { key: "height", label: "Boy (cm)", parse: parseFloat },
  { key: "weight", label: "Ağırlık (gr/m²)", parse: parseFloat },
  { key: "quantity", label: "Adet", parse: parseInt },
  { key: "westage", label: "Fire (%)", parse: parseFloat },
  { key: "boxPerPaper", label: "Kutu / Kağıt", parse: parseInt },
];

const selectInputs = [
  {
    key: "paperType",
    label: "Kağıt Cinsi",
    options: [
      { label: "Bristol", value: "bristol" },
      { label: "Krome", value: "chrome" },
      { label: "Kuşe", value: "glossy" },
      { label: "1. Hamur", value: "firstPulp" },
      { label: "Enzo", value: "enzo" },
      { label: "Kraft", value: "craft" },
    ],
  },
  {
    key: "printing",
    label: "Baskı",
    options: [
      { label: "Yok", value: null },
      { label: "Büyük", value: "big-printing" },
      { label: "Orta", value: "medium-printing" },
      { label: "Küçük", value: "small-printing" },
    ],
  },
  {
    key: "printingColor",
    label: "Baskı Rengi",
    options: [
      { label: "Tek Renk", value: "2" },
      { label: "CMYK", value: "1" },
    ],
  },
  {
    key: "frontCellophane",
    label: "Ön Selefon",
    options: [
      { label: "Yok", value: null },
      { label: "Gümüş", value: "silver" },
      { label: "Gold", value: "gold" },
      { label: "Mat", value: "opaque" },
      { label: "Parlak", value: "bright" },
      { label: "Sedef", value: "pearl" },
    ],
  },
  {
    key: "backCellophane",
    label: "Arka Selefon",
    options: [
      { label: "Yok", value: null },
      { label: "Gümüş", value: "silver" },
      { label: "Gold", value: "gold" },
      { label: "Mat", value: "opaque" },
      { label: "Parlak", value: "bright" },
      { label: "Sedef", value: "pearl" },
    ],
  },
  {
    key: "lakSize",
    label: "Lak Boyutu",
    options: [
      { label: "Yok", value: null },
      { label: "Büyük", value: "big" },
      { label: "Orta", value: "medium" },
      { label: "Küçük", value: "small" },
    ],
  },
  {
    key: "lakType",
    label: "Lak Tipi",
    options: [
      { label: "Normal Lak", value: "normal" },
      { label: "Embos Lak", value: "embos" },
      { label: "Efekt Lak", value: "efekt" },
      { label: "Sim Lak", value: "sim" },
    ],
  },
  {
    key: "cutting",
    label: "Kesim",
    options: [
      { label: "Yok", value: null },
      { label: "Büyük", value: "big-cutting" },
      { label: "Küçük", value: "small-cutting" },
    ],
  },
  {
    key: "pasting",
    label: "Yapıştırma",
    options: [
      { label: "Yok", value: null },
      { label: "Yan", value: "side-pasting" },
      { label: "Yan Dip", value: "side-by-side-pasting" },
    ],
  },
];

export default function InputScreen() {
  const { setField, resetAll, ...state } = useCalculationStore();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await calculatePrice(state);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Kağıt Bilgileri</h1>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {numericInputs.map(({ key, label, parse }) => (
            <CustomTextInput
              key={key}
              label={label}
              value={state[key]?.toString()}
              onChangeText={(text) => {
                const parsed = parse(text);
                setField(key, !isNaN(parsed) ? parsed : 0);
              }}
            />
          ))}
        </div>

        <div className="space-y-2 mb-4">
          {selectInputs.map(({ key, label, options }) => (
            <SelectionInput
              key={key}
              label={label}
              options={options}
              value={state[key]}
              onValueChange={(value) => setField(key, value)}
            />
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <CustomButton
          onReset={resetAll}
          onCalculate={handleCalculate}
        />

        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Hesaplanıyor...</p>
          </div>
        )}

        <ResultBox result={result} />
      </div>
    </div>
  );
}