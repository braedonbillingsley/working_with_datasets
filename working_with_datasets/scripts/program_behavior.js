/*  Braedon Billingsley
    02/17/23
    program_behgavior.js
    main driver for dataset website. Handles the stateCrime array and creates two buttons that cycle through the elements and displays relevent fields. 3 functions that calculate interesting facts about the data.
*/
//get access to our buttons
let previous = document.getElementById("previous");
let next = document.getElementById("next");

//the index of the current object shown
//on the web page
let index = 0;

//shows the number of elements in the array with the number underlined
let numberOfElements = stateCrimes.length;
let paragraph = document.querySelector("p");
paragraph.innerHTML += ` Total number of elements: <u>${numberOfElements}</u>`;

//runs functions
display();
highestViolentCrimeRate();
lowestViolentCrimeRate();
biggestCrimeRateDecrease();


//responds to clicks of the "previous" button and stops at 0
previous.onclick = function (event) {
    if (index > 0) {
        index--;
    } else {
        index = 0;
    }

    display();
}

//responds to clicks of the "next" button and stops at the maximum index of the array
next.onclick = function (event) {
    if (index < stateCrimes.length - 1) {
        index++;
    } else {
        index = stateCrimes.length;
    }

    display();
}

//shows the current record in the array of records
//at the position within the index variable
function display() {
    let currentStateCrime = stateCrimes[index];

    let showState = currentStateCrime.State;
    let showPops = currentStateCrime.Data.Population;
    let showYear = currentStateCrime.Year;
    let showViolentRate = currentStateCrime.Data.Rates.Violent.All;
    let showPropertyRate = currentStateCrime.Data.Rates.Property.All;
    let showViolentTotals = currentStateCrime.Data.Totals.Violent.All;
    let showPropertyTotals = currentStateCrime.Data.Totals.Property.All;

    let state = document.getElementById("stateName");
    let pops = document.getElementById("populationTotals");
    let year = document.getElementById("years");
    let violentRate = document.getElementById("ratesViolent");
    let propertyRate = document.getElementById("ratesProperty");
    let violentTotals = document.getElementById("totalsViolent");
    let propertyTotals = document.getElementById("totalsProperty");


    state.innerHTML = showState;
    pops.innerHTML = showPops;
    year.innerHTML = showYear;
    violentRate.innerHTML = showViolentRate;
    propertyRate.innerHTML = showPropertyRate;
    violentTotals.innerHTML = showViolentTotals;
    propertyTotals.innerHTML = showPropertyTotals;
}

//Interesting Facts
function highestViolentCrimeRate() {
    let highestViolentRate = 0;
    let stateWithHighestViolentRate = '';
    for (let i = 0; i < stateCrimes.length; i++) {
        let currentStateCrime = stateCrimes[i];
        let currentViolentRate = currentStateCrime.Data.Rates.Violent.All;
        if (currentViolentRate > highestViolentRate) {
            highestViolentRate = currentViolentRate;
            stateWithHighestViolentRate = currentStateCrime.State;
        }
    }
    topViolentRate.innerHTML = `The state with the highest violent crime rate is ${stateWithHighestViolentRate}, with a rate of ${highestViolentRate} per 100,000 people.`;
}

function lowestViolentCrimeRate() {
    let lowestViolentRate = Infinity;
    let stateWithLowestViolentRate = '';
    for (let i = 0; i < stateCrimes.length; i++) {
        let currentStateCrime = stateCrimes[i];
        let currentViolentRate = currentStateCrime.Data.Rates.Violent.All;
        if (currentViolentRate < lowestViolentRate) {
            lowestViolentRate = currentViolentRate;
            stateWithLowestViolentRate = currentStateCrime.State;
        }
    }
    lowViolentRate.innerHTML = `The state with the lowest violent crime rate is ${stateWithLowestViolentRate}, with a rate of ${lowestViolentRate} per 100,000 people.`;
}

function biggestCrimeRateDecrease() {
    let largestCrimeRateDecrease = 0;
    let stateWithBiggestDecrease = '';

    for (let i = 0; i < stateCrimes.length; i++) {
        let currentStateCrime = stateCrimes[i];
        let currentViolentRate = currentStateCrime.Data.Rates.Violent.All;
        let currentPropertyRate = currentStateCrime.Data.Rates.Property.All;

        // Gets the crime rate from 10 years ago
        let crimeRate10YearsAgo = 0;
        for (let j = 0; j < stateCrimes.length; j++) {
            let previousStateCrime = stateCrimes[j];
            if (previousStateCrime.State === currentStateCrime.State && previousStateCrime.Year === currentStateCrime.Year - 10) {
                crimeRate10YearsAgo = previousStateCrime.Data.Rates.Violent.All + previousStateCrime.Data.Rates.Property.All;
                break;
            }
        }
        // Calculates the crime rate decrease
        let crimeRateDecrease = crimeRate10YearsAgo - currentViolentRate - currentPropertyRate;

        if (crimeRateDecrease > largestCrimeRateDecrease) {
            largestCrimeRateDecrease = crimeRateDecrease;
            stateWithBiggestDecrease = currentStateCrime.State;
        }
    }

    decreaseInCrime.innerHTML = `The state with the biggest decrease in crime rates over the past decade is ${stateWithBiggestDecrease}, with a decrease of ${largestCrimeRateDecrease} per 100,000 people.`
}




