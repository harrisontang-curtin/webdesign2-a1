// UI Input variables for budget input and display
let budgetInput = document.querySelector("#budget-input");
let budgetOutput = document.querySelector("#budget-output");

// UI input variables for accomodation category inputs
let hotelInput = document.querySelector("#hotel-input");
let airbnbInput = document.querySelector("#airbnb-input");
let motelInput = document.querySelector("#motel-input");

// UI input variables for food category inputs
let breakfastInput = document.querySelector("#breakfast-input");
let lunchInput = document.querySelector("#lunch-input");
let dinnerInput = document.querySelector("#dinner-input");

// UI input variables for travel category inputs
let uberInput = document.querySelector("#uber-input");
let busInput = document.querySelector("#bus-input");
let trainInput = document.querySelector("#train-input");

// UI button variable for calculating net result
let calcButton = document.querySelector("#calc-button");

// Associative array for accomodation category
let accom = {
    hotel: 0,
    airbnb: 0,
    motel: 0,
    subtotal: 0,
    avg: 0
};

// Associative array for food category
let food = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    subtotal: 0,
    avg: 0
};

// Associative array for travel category
let travel = {
    uber: 0,
    bus: 0,
    train: 0,
    subtotal: 0,
    avg: 0
};

// Event listener for budget input
// Used input event for smooth usability and dynamic display
budgetInput.addEventListener("input", function() {
    let budget = Number(budgetInput.value);
    
    budgetOutput.innerHTML = "$" + parseFloat(budget).toFixed(2);
});



// Event listeners for Accomodation category inputs
// Used input event for category inputs for dynamic display 
// dynamic and average and subtotal calculation
hotelInput.addEventListener("input", function() {
    accom.hotel = Number(hotelInput.value);
    calculateSubtotal(accom.hotel, accom.airbnb, accom.motel, accom, "accom");

    console.log("Hotel: " + accom.hotel);
});

airbnbInput.addEventListener("input", function() {
    accom.airbnb = Number(airbnbInput.value);
    calculateSubtotal(accom.hotel, accom.airbnb, accom.motel, accom, "accom");

    console.log("Airbnb: " + accom.airbnb);
});

motelInput.addEventListener("input", function() {
    accom.motel = Number(motelInput.value);
    calculateSubtotal(accom.hotel, accom.airbnb, accom.motel, accom, "accom");

    console.log("Motel: " + accom.motel);
});

// Event listeners for Food category inputs
breakfastInput.addEventListener("input", function() {
    food.breakfast = Number(breakfastInput.value);
    calculateSubtotal(food.breakfast, food.lunch, food.dinner, food, "food");

    console.log("Breakfast: " + food.breakfast);
});

lunchInput.addEventListener("input", function() {
    food.lunch = Number(lunchInput.value);
    calculateSubtotal(food.breakfast, food.lunch, food.dinner, food, "food");

    console.log("Lunch: " + food.lunch);
});

dinnerInput.addEventListener("input", function() {
    food.dinner = Number(dinnerInput.value);
    calculateSubtotal(food.breakfast, food.lunch, food.dinner, food, "food");

    console.log("Dinner: " + food.dinner);
});

// Event listeners for Travel category inputs
uberInput.addEventListener("input", function() {
    travel.uber = Number(uberInput.value);
    calculateSubtotal(travel.uber, travel.bus, travel.train, travel, "travel");

    console.log("Uber: " + travel.uber);
});

busInput.addEventListener("input", function() {
    travel.bus = Number(busInput.value);
    calculateSubtotal(travel.uber, travel.bus, travel.train, travel, "travel");

    console.log("Bus: " + travel.bus);
});

trainInput.addEventListener("input", function() {
    travel.train = Number(trainInput.value);
    calculateSubtotal(travel.uber, travel.bus, travel.train, travel, "travel");

    console.log("Train: " + travel.train);
});

// Event listener for calculate button
calcButton.addEventListener("click", function() {
    let budget = Number(document.querySelector("#budget-input").value);

    if (budget == null) {
        budget = 0;
    }

    calculateNetResult(accom.subtotal, food.subtotal, travel.subtotal, budget);
});






/* Function for calculating subtotal of each category

pseudocode:
calculateSubtotal(item1, item2, item3, category, categoryString)
    subtotal = item1 + item2 + item3
    store subtotal in category.subtotal
    display subtotal to UI based on categoryString

    send category, categoryString to calculateAverage()
*/
function calculateSubtotal(item1, item2, item3, category, categoryString) {
    category.subtotal = parseFloat(item1) + parseFloat(item2) + parseFloat(item3);

    if (isNaN(category.subtotal)) {
        category.subtotal = 0;
    }

    let subtotalOutput = document.querySelector("." + categoryString + "-container .subtotal-output");
    subtotalOutput.innerHTML = "$" + category.subtotal.toFixed(2);
    console.log("subtotal: " + category.subtotal);

    calculateAverage(category, categoryString);

}

/* Function for calculating category average

pseudocode: 
calculateAverage(category, categoryString) 
    for key in category
        if key: 0 or key == "subtotal" or "avg"
            count++
    
    average = category.subtotal / count
    store average in category.avg
    display average in UI based on categoryString
*/
function calculateAverage(category, categoryString) {
    let count = 0;
    let average = 0;
    console.log(category);

    /* 
    For each item in category, add to count for every item that is not subtotal or avg
    or if item = 0 (not included for calculating average).
    If a user planning their holiday will not stay in a motel, average calculation
    should not include motel
    */
    for (let key in category) {
        if (key !== "subtotal" && key !== "avg" && category[key] !== 0) {
            count += 1;
        }
    }

    console.log("Count: " + count);

    
    // If category subtotal is 0, average must also be 0
    // else, divide subtotal by count to calculate average
    if (category.subtotal === 0 || isNaN(category.subtotal) ) {
        average = 0;
    }
    else {
        average = category.subtotal / count;
    }

    category.avg = average;

    let averageOutput = document.querySelector("." + categoryString + "-container .average-output");
    averageOutput.innerHTML = "$" + category.avg.toFixed(2);
    console.log(category.avg);

}

/* Function for calculating net result

pseudocode:
calculateNetResult(subtotal1, subtotal2, subtotal3, budget)
    totalExpenses = subtotal1 + subtotal2 + subtotal3
    netResult = budget - totalExpenses

    display totalExpenses to UI
    display netResult to UI

    if netResult >= 0 
        display "ON BUDGET" to UI
        display happy-face.png to UI
    else 
        display "NOT ON BUDGET" to UI
        display sad-face.png to UI
*/
function calculateNetResult(subtotal1, subtotal2, subtotal3, budget) {
    let netResult = 0;
    let totalExpenses = 0;

    totalExpenses = parseFloat(subtotal1) + parseFloat(subtotal2) + parseFloat(subtotal3);

    console.log("Budget: " + budget);
    let budgetOutput = document.querySelector("#budget-output");
    budgetOutput.innerHTML = "$" + budget.toFixed(2);

    console.log("Total expenses: " + totalExpenses);
    let totalExpensesOutput = document.querySelector("#total-expenses-output");
    totalExpensesOutput.innerHTML = "$" + totalExpenses.toFixed(2);

    netResult = budget - totalExpenses;
    console.log("Net result: Budget - total expenses = " + netResult);
    let netResultOutput = document.querySelector("#net-result-output");
    netResultOutput.innerHTML = "$" + netResult.toFixed(2);

    let netResultMsgOutput = document.querySelector("#net-result-msg-output");
    let netResultImgOutput = document.querySelector("#net-result-img-output");
    
    /* 
    If net result 0 or more, display On Budget message with image
    else, display Not On Budget message with image
     */
    if (netResult >= 0) {
        
        netResultMsgOutput.innerHTML = "ON<br>BUDGET";
        netResultImgOutput.setAttribute("src", "images/check.png");
    }
    else {
        netResultMsgOutput.innerHTML = "NOT ON<br>BUDGET";
        netResultImgOutput.setAttribute('src', 'images/cross.png');
    }

    netResultImgOutput.style.visibility = "visible";
}