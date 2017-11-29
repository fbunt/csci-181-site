const MIN_AGE = 13;
const MAX_AGE = 30;
const TEEN_CUT = 17;
// Young adult cutoff
const YA_CUT = 25;

const USERNAME_MIN_SIZE = 4;
const USERNAME_MAX_SIZE = 12;


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
        text = "Group: ";
        if (age >= MIN_AGE && age <= TEEN_CUT) {
            text += "Juniors";
        } else if (age > TEEN_CUT && age <= YA_CUT) {
            text += "Young Wolves"
        } else if (age > YA_CUT) {
            text += "Old Guard";
        }
    }
    getById("age-group").innerHTML = text;
}

function tooShort(name) {
    return name.length < USERNAME_MIN_SIZE;
}

function tooLong(name) {
    return name.length > USERNAME_MAX_SIZE;
}

function validateUsername(name) {
    return !tooShort(name) && !tooLong(name);
}

/**
 * Displays an error message to the user if the username is not valid.
 */
function checkUsername() {
    var text = getById("form-username").value.toString();
    if (tooShort(text)) {
        getById("username-msg").innerHTML =
                "Username must be at least 4 characters";
    } else if (tooLong(text)) {
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
 * @param radio the t size radio button selected
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
 * Map the value to the correct element ID
 */
function mapClassToContainerId(value) {
    // Currently no need to do anything.
    return value;
}

/**
 * Map the value to the correct image.
 */
function getImageName(value) {
    return "images/ow-heroes-" + value + ".jpg";
}

/**
 * Displays an image representing the class selected. All classes can be
 * displayed together.
 *
 * @param check the checkbox most recently clicked
 */
function displayHeroClass(check) {

    var container = getById(mapClassToContainerId(check.value));
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    if (check.checked) {
        var img = document.createElement("img");
        img.src = getImageName(check.value);
        container.appendChild(img);
        container.style.display = "block"
    } else {
        // Completely hide the element
        container.style.display = "none";
    }
}

// TODO: Set event functions here instead of in html
function onLoad() {
    populateAgeValues();
}


// F O R M   V A L I D A T I O N   F U N C T I O N S

function validatePersonalInfo() {
    var fname = getById(["form-first-name"]).value.trim();
    var lname = getById("form-last-name").value.trim();
    var gender = getById("form-female").checked
            || getById("form-male").checked;
    var age = parseInt(getById("form-age").value);
    return Boolean(fname && lname && gender && Number.isInteger(age));
}

function validateContactInfo() {
    var email = getById("form-email").value.trim();
    var phone = getById("form-telephone").value.trim();
    return Boolean(email && phone);
}

function validateGeneralInfo() {
    var uname = getById("form-username").value.trim();
    var sizeChecked = false;
    var radios = document.getElementsByName("t-size");
    for (var i = 0; i < radios.length; ++i) {
        sizeChecked |= radios[i].checked;
    }
    return Boolean(validateUsername(uname) && sizeChecked);
}

function validateOverwatchInfo() {
    var checks = document.getElementsByName("form-pref-class");
    var checked = false;
    for (var i = 0; i < checks.length; ++i) {
        checked |= checks[i].checked;
    }
    var expl = getById("form-explanation").value.trim();
    return Boolean(checked && expl);
}

function validateForm() {
    if (validatePersonalInfo()
            && validateContactInfo()
            && validateGeneralInfo()
            && validateOverwatchInfo()) {
        return true;
    } else {
        alert("Please complete all required fields.");
        return false;
    }
}
