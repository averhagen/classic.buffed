"use strict";

console.log("Index js loaded.");

function getStatDifferentials() {
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
    setOutputLabelsToMatchInputValue();
    addStatDifferentialsToOutputLabels(statDifferentials);
}

function setOutputLabelsToMatchInputValue() {
    let statInputs = document.getElementsByClassName("stat-list__input");
    for (let i = 0; i < statInputs.length; i++) {
        let expectedId = "output" + statInputs[i].id;
        let outputLabel = document.getElementById(expectedId);
        outputLabel.innerHTML = statInputs[i].value;
    }
}

function addStatDifferentialsToOutputLabels(statDifferentials) {
    for (let i = 0; i < statDifferentials.length; i++) {
        let currentStatDifferential = statDifferentials[i];

        let diffLabel = document.getElementById("diff" + currentStatDifferential.stat._id);
        diffLabel.innerHTML = currentStatDifferential.difference;
        
        let outputLabel = document.getElementById("output" + currentStatDifferential.stat._id);
        outputLabel.innerHTML = parseInt(outputLabel.innerHTML) + currentStatDifferential.difference;
    }
}

function myFunction() {
    console.log("My Function Called");
}