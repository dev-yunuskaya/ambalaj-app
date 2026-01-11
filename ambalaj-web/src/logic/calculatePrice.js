export const calculatePrice = async (inputs) => {
    const {
        width,
        height,
        weight,
        quantity,
        westage,
        paperType,
        printing,
        printingColor,
        frontCellophane,
        backCellophane,
        lakSize,
        lakType,
        cutting,
        pasting,
        boxPerPaper,
    } = inputs;

    const getPrice = async (key) => {
        if (!key) return 0;
        const val = localStorage.getItem(key);
        return parseFloat(val) || 0;
    };

    const calculateTotalWeight = (w, h, wg) => (w * h * wg) / 10000;
    const totalWeight = calculateTotalWeight(width, height, weight);
    console.log(totalWeight);

    const typePrice = await getPrice(paperType);
    console.log(typePrice);
    const paperPrice = ((totalWeight * typePrice) / 1000) * (1 + westage / 100);
    console.log(paperPrice);

    let firstThousand = 0,
        afterThousand = 0;

    if (printing === "big-printing") {
        firstThousand = await getPrice("firstThousandBigPrinting");
        afterThousand = await getPrice("afterThousandBigPrinting");
    } else if (printing === "medium-printing") {
        firstThousand = await getPrice("firstThousandMediumPrinting");
        afterThousand = await getPrice("afterThousandMediumPrinting");
    } else if (printing === "small-printing") {
        firstThousand = await getPrice("firstThousandSmallPrinting");
        afterThousand = await getPrice("afterThousandSmallPrinting");
    }

    const printingPrice =
        (firstThousand +
            (afterThousand / 1000) * Math.max(0, quantity - 1000)) /
        printingColor;

    const frontCellophanePrice =
        frontCellophane === null ? 0 : await getPrice(frontCellophane);
    const backCellophanePrice =
        backCellophane === null ? 0 : await getPrice(backCellophane);
    const cellophanePrice =
        ((frontCellophanePrice * width * height) / 10000 +
            (backCellophanePrice * width * height) / 10000) *
        quantity;

    let lakPrice = 0;
    if (lakType && lakSize) {
        const lakKeyBase =
            lakType + lakSize.charAt(0).toUpperCase() + lakSize.slice(1);
        const firstLak = await getPrice(lakKeyBase + "First");
        const afterLak = await getPrice(lakKeyBase + "After");
        lakPrice = firstLak + (afterLak / 1000) * Math.max(0, quantity - 1000);
    }

    let cuttingPrice = 0;
    if (cutting !== null && cutting !== 0) {
        console.log("cutting -> " + cutting);
        const firstCut = await getPrice(
            cutting === "big-cutting"
                ? "firstThousandBigCutting"
                : "firstThousandSmallCutting"
        );
        console.log("firstCut -> " + firstCut);
        const afterCut = await getPrice(
            cutting === "big-cutting"
                ? "afterThousandBigCutting"
                : "afterThousandSmallCutting"
        );
        console.log("afterCut -> " + afterCut);
        cuttingPrice =
            firstCut + (afterCut / 1000) * Math.max(0, quantity - 1000);
    }

    console.log("cuttingPrice -> " + cuttingPrice);

    const boxQuantity = boxPerPaper * quantity;

    let pastingPrice = 0;
    if (pasting !== null && pasting !== 0) {
        const firstPasting = await getPrice(
            pasting === "side-pasting"
                ? "firstThousandSidePasting"
                : "firstThousandSideBySidePasting"
        );
        const afterPasting = await getPrice(
            pasting === "side-pasting"
                ? "afterThousandSidePasting"
                : "afterThousandSideBySidePasting"
        );
        console.log("box count " + boxQuantity);
        console.log("firstpasting " + firstPasting);
        console.log("afterpasting " + afterPasting);
        if (boxQuantity >= 10000) {
            pastingPrice =
                firstPasting + (afterPasting / 10000) * (boxQuantity - 10000);
        } else {
            pastingPrice = firstPasting;
        }
    }

    const totalPaper = paperPrice * quantity;
    const totalPrice =
        totalPaper +
        printingPrice +
        cellophanePrice +
        lakPrice +
        cuttingPrice +
        pastingPrice;

    return {
        totalWeight: totalWeight.toFixed(2),
        paperPrice: paperPrice.toFixed(3),
        totalPaper: totalPaper.toFixed(2),
        printingPrice: printingPrice.toFixed(2),
        cellophanePrice: cellophanePrice.toFixed(2),
        lakPrice: lakPrice.toFixed(2),
        cuttingPrice: cuttingPrice.toFixed(2),
        pastingPrice: pastingPrice.toFixed(2),
        unitPrice: (totalPrice / (quantity * boxPerPaper)).toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    };
};

export const logAllLocalStorage = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
        console.log(`${key}: ${localStorage.getItem(key)}`);
    });
};
