import { create } from "zustand";

export const useCalculationStore = create((set, get) => ({
    //paper information
    width: null,
    height: null,
    weight: null,
    quantity: null,
    westage: null,
    boxPerPaper: null,
    paperType: "bristol",
    printing: null,
    printingColor: 2,
    frontCellophane: null,
    backCellophane: null,
    lakSize: null,
    lakType: null,
    cutting: null,
    pasting: null,

    // paper price
    bristol: 0,
    chrome: 0,
    glossy: 0,
    firstPulp: 0,
    enzo: 0,
    craft: 0,

    // printing
    firstThousandBigPrinting: 0,
    afterThousandBigPrinting: 0,
    firstThousandMediumPrinting: 0,
    afterThousandMediumPrinting: 0,
    firstThousandSmallPrinting: 0,
    afterThousandSmallPrinting: 0,

    // cellophane
    silver: 0,
    gold: 0,
    opaque: 0,
    bright: 0,
    pearl: 0,

    // cutting
    firstThousandBigCutting: 0,
    afterThousandBigCutting: 0,
    firstThousandSmallCutting: 0,
    afterThousandSmallCutting: 0,

    // pasting
    firstThousandSidePasting: 0,
    afterThousandSidePasting: 0,
    firstThousandSideBySidePasting: 0,
    afterThousandSideBySidePasting: 0,

    // lak
    normalBigFirst: 0,
    normalBigAfter: 0,
    normalMediumFirst: 0,
    normalMediumAfter: 0,
    normalSmallFirst: 0,
    normalSmallAfter: 0,
    embosBigFirst: 0,
    embosBigAfter: 0,
    embosMediumFirst: 0,
    embosMediumAfter: 0,
    embosSmallFirst: 0,
    embosSmallAfter: 0,
    efektBigFirst: 0,
    efektBigAfter: 0,
    efektMediumFirst: 0,
    efektMediumAfter: 0,
    efektSmallFirst: 0,
    efektSmallAfter: 0,
    simBigFirst: 0,
    simBigAfter: 0,
    simMediumFirst: 0,
    simMediumAfter: 0,
    simSmallFirst: 0,
    simSmallAfter: 0,

    // Auth state kaldırıldı, basit proje için

    setField: (key, value) => set((state) => ({ ...state, [key]: value })),

    resetAll: () =>
        set({
            width: null,
            height: null,
            weight: null,
            quantity: null,
            westage: null,
            boxPerPaper: null,
            paperType: "bristol",
            printing: null,
            printingColor: 2,
            frontCellophane: null,
            backCellophane: null,
            lakSize: null,
            lakType: null,
            cutting: null,
            pasting: null,
        }),

    // Load prices from localStorage (fallback)
    loadPricesFromStorage: () => {
        const priceKeys = [
            "bristol",
            "chrome",
            "glossy",
            "firstPulp",
            "enzo",
            "craft",
            "firstThousandBigPrinting",
            "afterThousandBigPrinting",
            "firstThousandMediumPrinting",
            "afterThousandMediumPrinting",
            "firstThousandSmallPrinting",
            "afterThousandSmallPrinting",
            "silver",
            "gold",
            "opaque",
            "bright",
            "pearl",
            "firstThousandBigCutting",
            "afterThousandBigCutting",
            "firstThousandSmallCutting",
            "afterThousandSmallCutting",
            "firstThousandSidePasting",
            "afterThousandSidePasting",
            "firstThousandSideBySidePasting",
            "afterThousandSideBySidePasting",
            "normalBig",
            "normalMedium",
            "normalSmall",
            "embosBig",
            "embosMedium",
            "embosSmall",
            "efektBig",
            "efektMedium",
            "efektSmall",
            "simBig",
            "simMedium",
            "simSmall",
            "normalBigFirst",
            "normalBigAfter",
            "normalMediumFirst",
            "normalMediumAfter",
            "normalSmallFirst",
            "normalSmallAfter",
            "embosBigFirst",
            "embosBigAfter",
            "embosMediumFirst",
            "embosMediumAfter",
            "embosSmallFirst",
            "embosSmallAfter",
            "efektBigFirst",
            "efektBigAfter",
            "efektMediumFirst",
            "efektMediumAfter",
            "efektSmallFirst",
            "efektSmallAfter",
        ];

        const updates = {};
        priceKeys.forEach((key) => {
            const value = localStorage.getItem(key);
            if (value && !isNaN(parseFloat(value))) {
                updates[key] = parseFloat(value);
            }
        });

        if (Object.keys(updates).length > 0) {
            set(updates);
        }
    },

    // Save prices to localStorage
    savePricesToStorage: () => {
        const state = get();
        const priceKeys = [
            "bristol",
            "chrome",
            "glossy",
            "firstPulp",
            "enzo",
            "craft",
            "firstThousandBigPrinting",
            "afterThousandBigPrinting",
            "firstThousandMediumPrinting",
            "afterThousandMediumPrinting",
            "firstThousandSmallPrinting",
            "afterThousandSmallPrinting",
            "silver",
            "gold",
            "opaque",
            "bright",
            "pearl",
            "firstThousandBigCutting",
            "afterThousandBigCutting",
            "firstThousandSmallCutting",
            "afterThousandSmallCutting",
            "firstThousandSidePasting",
            "afterThousandSidePasting",
            "firstThousandSideBySidePasting",
            "afterThousandSideBySidePasting",
            "normalBig",
            "normalMedium",
            "normalSmall",
            "embosBig",
            "embosMedium",
            "embosSmall",
            "efektBig",
            "efektMedium",
            "efektSmall",
            "simBig",
            "simMedium",
            "simSmall",
        ];

        priceKeys.forEach((key) => {
            if (state[key] !== undefined && state[key] !== null) {
                localStorage.setItem(key, state[key].toString());
            }
        });
    },
}));
