import { calculatePrice } from "../logic/calculatePrice";

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => (store[key] = value.toString()),
        clear: () => (store = {}),
    };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("calculatePrice", () => {
    beforeEach(() => {
        localStorage.clear();
        // Set mock prices
        localStorage.setItem("paperType1", "10");
        localStorage.setItem("firstThousandBigPrinting", "5");
        localStorage.setItem("afterThousandBigPrinting", "3");
    });

    test("calculates price correctly", async () => {
        const inputs = {
            width: 10,
            height: 20,
            weight: 100,
            quantity: 2000,
            westage: 10,
            paperType: "paperType1",
            printing: "big-printing",
            printingColor: 2,
            frontCellophane: null,
            backCellophane: null,
            cutting: null,
            pasting: null,
            boxPerPaper: 1,
        };

        const result = await calculatePrice(inputs);
        expect(result.totalPrice).toBeDefined();
        expect(parseFloat(result.totalPrice)).toBeGreaterThan(0);
    });
});
