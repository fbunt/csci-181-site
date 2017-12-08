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
function updateAgeGroup() {
    var age = parseInt(getById("form-age").value);
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

/**
 * Indicate if the name value is too short.
 */
function tooShort(name) {
    return name.length < USERNAME_MIN_SIZE;
}

/**
 * Indicate if the name value is too long.
 */
function tooLong(name) {
    return name.length > USERNAME_MAX_SIZE;
}

/**
 * Validate the username value.
 */
function validateUsername(name) {
    return !tooShort(name) && !tooLong(name);
}

/**
 * Displays an error message to the user if the username is not valid.
 *
 * Also changes the background color of the text box to indicate validity:
 * light red for invalid and light green for valid.
 */
function checkUsername() {
    var input = getById("form-username");
    var text = input.value.toString().trim();
    if (tooShort(text)) {
        getById("username-msg").innerHTML =
                "Username must be at least 4 characters";
        // Set to light red
        input.style.backgroundColor = "#ff9b9b";
    } else if (tooLong(text)) {
        getById("username-msg").innerHTML =
                "Username can't be more than 12 characters";
        // Set to light red
        input.style.backgroundColor = "#ff9b9b";
    } else {
        getById("username-msg").innerHTML = "";
        // Set to light green
        input.style.backgroundColor = "#bfffbf";
    }
}

/**
 * Displays the t shirt price based on the size selected and the length of the
 * users first name.
 *
 * @param radio the t size radio button selected
 */
function updateTShirtCost() {
    var radio = null;
    var radios = document.getElementsByName("t-size");
    for (var i = 0; i < radios.length; ++i) {
        if (radios[i].checked) {
            radio = radios[i];
            break;
        }
    }
    if (!radio) return;

    // base shirt cost
    var base = 10;
    // increment value
    var inc = 5;
    var nameLen = getById("form-first-name").value.trim().length
    // base + (inc * t-size) + length of first name
    var text = "<span class='fw-bold'>Cost</span>: $";
    text += base + (inc * parseInt(radio.value)) + nameLen;
    getById("t-shirt-cost").innerHTML = text;
}

/**
 * Map the value to the correct element ID
 */
function mapClassToImageId(value) {
    // Currently no need to do anything more
    return value;
}

/**
 * Displays an image representing the class selected. All classes can be
 * displayed together.
 *
 * This function also makes the class checkboxes and "Not Sure" checkbox
 * mutually exclusive such that when the not-sure box is checked, the others
 * are unchecked and vice versa. In this way, the images are hidden when
 * not-sure box is checked.
 *
 * @param check the checkbox most recently clicked
 */
function displayHeroClass(check) {
    // Handle "none" checkbox
    if (check.value === "none") {
        if (check.checked) {
            // Uncheck the other checkboxes
            var checkboxes = document.getElementsByName("form-pref-class");
            for (var i = 0; i < checkboxes.length; ++i) {
                var cb = checkboxes[i];
                if (cb !== check && cb.checked) {
                    // Uncheck and fire event so this func is called again for
                    // the checkbox that was "clicked".
                    cb.click();
                }
            }
        }
        return;
    }

    var container = getById(mapClassToImageId(check.value));
    if (check.checked) {
        // Uncheck "none" checkbox but don't fire event
        getById("form-none").checked = false;
        // Show image when checked
        container.style.display = "block"
    } else {
        // Completely hide the element
        container.style.display = "none";
    }
}


// F O R M   V A L I D A T I O N   F U N C T I O N S

/**
 * Validate the Personal Info fieldset.
 */
function validatePersonalInfo() {
    var fname = getById(["form-first-name"]).value.trim();
    var lname = getById("form-last-name").value.trim();
    var gender = getById("form-female").checked
            || getById("form-male").checked;
    var age = parseInt(getById("form-age").value);
    return Boolean(fname && lname && gender && Number.isInteger(age));
}

/**
 * Validate the Contact Info fieldset.
 */
function validateContactInfo() {
    var email = getById("form-email").value.trim();
    var phone = getById("form-telephone").value.trim();
    return Boolean(email && phone);
}

/**
 * Validate the General Info fieldset.
 */
function validateGeneralInfo() {
    var uname = getById("form-username").value.trim();
    var sizeChecked = false;
    var radios = document.getElementsByName("t-size");
    for (var i = 0; i < radios.length; ++i) {
        sizeChecked |= radios[i].checked;
    }
    return Boolean(validateUsername(uname) && sizeChecked);
}

/**
 * Validate the Overwatch Info fieldset.
 */
function validateOverwatchInfo() {
    var checks = document.getElementsByName("form-pref-class");
    var checked = false;
    for (var i = 0; i < checks.length; ++i) {
        checked |= checks[i].checked;
    }
    var expl = getById("form-explanation").value.trim();
    return Boolean(checked && expl);
}

/**
 * Validate the entire form.
 *
 * @returns {boolean} the validity of the form
 */
function validateForm() {
    return validatePersonalInfo()
            && validateContactInfo()
            && validateGeneralInfo()
            && validateOverwatchInfo()
}


// I N I T I A L I Z A T I O N

/**
 * Initialize the page and set event listeners.
 *
 * In my experience, setting event handlers in any sort of markup (looking at
 * you Android XML) only leads to headaches.
 */
function onLoad() {
    // Form init
    getById("reg-form").addEventListener("submit", function (event) {
        if (!validateForm()) {
            alert("Please complete all required fields.");
            event.preventDefault();
        }
    }, false);
    getById("reg-form").action = "reg_complete.html";

    // First Name
    getById("form-first-name")
            .addEventListener("keyup", updateTShirtCost, false);

    // Age
    populateAgeValues();
    getById("form-age").addEventListener("change", updateAgeGroup, false);

    // Username
    getById("form-username").addEventListener("keyup", checkUsername, false);

    // T shirt size
    var tsizeRadios = document.getElementsByName("t-size");
    for (var i = 0; i < tsizeRadios.length; ++i) {
        tsizeRadios[i].addEventListener("click", updateTShirtCost, false);
    }

    // Hero Class imgs
    var classChecks = document.getElementsByName("form-pref-class");
    for (var i = 0; i < classChecks.length; ++i) {
        classChecks[i].addEventListener("click", function (event) {
            displayHeroClass(event.target || event.srcElement);
        }, false);
    }
    // Hide images
    var nodes = document.getElementsByClassName("class-img-container");
    for (var i = 0; i < nodes.length; ++i) {
        nodes[i].style.display = "none";
    }
}


// Execute initialization once HTML has been parsed.
document.addEventListener("DOMContentLoaded", function() {
    onLoad();
});
