import { getUniqueNumber, getUniqueString } from "../value_generator";

test("getUniqueNumber generates unique numbers", async () => {
    const generatedNumbers = new Set<number>();

    for (let i = 0; i < 100; i++) {
        const generatedNumber = getUniqueNumber();
        expect(generatedNumbers.has(generatedNumber)).toBe(false);
        generatedNumbers.add(generatedNumber);
    }
});


test("getUniqueString() generates unique strings", async () => {
    const generatedStrings = new Set<string>();

    for (let i = 0; i < 100; i++) {
        const generatedString = getUniqueString();
        expect(generatedStrings.has(generatedString)).toBe(false);
        generatedStrings.add(generatedString);
    }
});