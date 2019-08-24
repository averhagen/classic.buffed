let stringCounter = 0;
let numberCounter = 0;

function getUniqueString(): string {
    stringCounter++;
    return "Random String #:" + stringCounter;
}

function getUniqueNumber(): number {
    numberCounter++;
    return numberCounter;
}

export { getUniqueString, getUniqueNumber };