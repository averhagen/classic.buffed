"use strict";

console.log("Index js loaded.");

function getStatDifferentials() {
    resetOutputAndDifferenceLabels();
    fetch('rest/buffsets' + createQueryString(getSelectedBuffIds())).then(function (response) {
        return response.json();
    }).then(updateStatDifferentials).catch(function (error) {
        console.log(error);
    });
}

function getSelectedBuffIds() {
    let buffIds = [];
    let buffCheckBoxes = document.getElementsByClassName("buff-list__checkbox");
    for (let i = 0; i < buffCheckBoxes.length; i++) {
        let currentCheckBox = buffCheckBoxes[i];
        if (currentCheckBox.checked) {
            buffIds.push(currentCheckBox.value);
        }
    }
    return buffIds;
}

function createQueryString(buffIds) {
    let queryString = "?";
    for (let i = 0; i < buffIds.length; i++) {
        queryString += "buff_id=" + buffIds[i] + "&";
    }
    return queryString.slice(0, -1);
}

function updateStatDifferentials(statDifferentials) {
    addStatDifferentialsToOutputLabels(statDifferentials);
}

function resetOutputAndDifferenceLabels() {
    console.log("Setting Outputs to Equal inputs");
    let statInputs = document.getElementsByClassName("stat-list__input");
    for (let i = 0; i < statInputs.length; i++) {
        setDifferenceLabelToEqualValue(statInputs[i].id, 0);
        setStatOutputLabelToEqualValue(statInputs[i].id, statInputs[i].value);
    }
}

function setDifferenceLabelToEqualValue(statId, newValue) {
    let expectedDiffLabelId = "diff" + statId;
    let diffLabel = document.getElementById(expectedDiffLabelId);
    if (diffLabel) {
        diffLabel.innerHTML = newValue;
    }
}

function setStatOutputLabelToEqualValue(statId, newValue) {
    let expectedId = "output" + statId;
    let outputLabel = document.getElementById(expectedId);
    if (outputLabel) {
        outputLabel.innerHTML = newValue;
    }
}

function addStatDifferentialsToOutputLabels(statDifferentials) {
    for (let i = 0; i < statDifferentials.length; i++) {
        let currentStatDifferential = statDifferentials[i];

        let diffLabel = document.getElementById("diff" + currentStatDifferential.stat._id);
        if (diffLabel) {
            diffLabel.innerHTML = currentStatDifferential.difference;
        }

        let outputLabel = document.getElementById("output" + currentStatDifferential.stat._id);
        if (outputLabel) {
            outputLabel.innerHTML = parseInt(outputLabel.innerHTML) + currentStatDifferential.difference;
        }
    }
}