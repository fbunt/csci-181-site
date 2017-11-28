const MIN_AGE = 13;
const MAX_AGE = 30;
const TEEN_CUT = 17;
// Young adult cutoff
const YA_CUT = 25;

/**
 * Get the element with the specified ID.
 */
function getById(id) {
    return document.getElementById(id);
}

/**
 * Adds age values to the age drop down.
 */
function populateAgeValues() {
    var select = getById("form-age");
    for (var i = MIN_AGE; i <= MAX_AGE; ++i) {
        var opt = i.toString();
        var optEl = document.createElement("option");
        optEl.textContent = opt;
        optEl.value = opt;
        select.appendChild(optEl);
    }
}

/**
 * Updates the age group indicator based on the selected age.
 */
function updateAgeGroup(ageInput) {
    var age = parseInt(ageInput.value);
    var text = "";
    if (Number.isInteger(age)) {
        if (age >= MIN_AGE && age <= TEEN_CUT) {
            text = "Junior";
        } else if (age > TEEN_CUT && age <= YA_CUT) {
            text = "Young Wolf"
        } else if (age > YA_CUT) {
            text = "Old Guard";
        }
    }
    getById("age-group").innerHTML = text;
}

/**
 * Displays an error message to the user if the username is not valid.
 */
function checkUsername() {
    var text = getById("form-username").value.toString();
    if (text.length < 4) {
        getById("username-msg").innerHTML =
            "Username must be at least 4 characters";
    } else if (text.length > 12) {
        getById("username-msg").innerHTML =
            "Username can't be more than 12 characters";
    } else {
        getById("username-msg").innerHTML = "";
    }
}

/**
 * Displays the t shirt price based on the size selected and the length of the
 * users first name.
 *
 * @param radio the size redio button selected
 */
function updateTShirtCost(radio) {
    // base shirt cost
    var base = 10;
    // increment value
    var inc = 5;
    // base + (inc * t-size) + length of first name
    var text = "<span class='fw-bold'>Cost</span>: $";
    text += base + (inc * parseInt(radio.value))
        + getById("form-first-name").value.trim().length;
    getById("t-shirt-cost").innerHTML = text;
}

/**
 * Displays an image representing the class selected. All classes can be
 * displayed together.
 *
 * @param check the checkbox most recently clicked
 */
function displayClass(check) {
    var container = getById(check.value);
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    if (check.checked) {
        var img = document.createElement("img");
        img.src = "images/ow-heroes-" + check.value + ".jpg";
       container.appendChild(img);
    }
}

function onLoad() {
    populateAgeValues();
}

function validateForm() {
    return true;
}
