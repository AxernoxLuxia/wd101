//npx tailwindcss -i ./input.css -o ./output.css --watch

//Email Validation
const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));
function validate(email) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("The email is not in the right format");
        email.reportValidity();
    } else {
        email.setCustomValidity("");
    }
}

//DOB Validaton

const dob = document.getElementById("dob");
const date = new Date();
const year = date.getFullYear() - 55;
let date55 = String(year);
if (date.getMonth() + 1 < 10) {
    date55 = date55 + "-" + "0" + String(date.getMonth() + 1);
} else {
    date55 = date55 + "-" + String(date.getMonth() + 1);
}
if (date.getDate() < 10) {
    date55 = date55 + "-" + "0" + String(date.getDate());
} else {
    date55 = date55 + "-" + String(date.getDate());
}
const year1 = date.getFullYear() - 18;
let date18 = String(year1);
if (date.getMonth() + 1 < 10) {
    date18 = date18 + "-" + "0" + String(date.getMonth() + 1);
} else {
    date18 = date18 + "-" + String(date.getMonth() + 1);
}
if (date.getDate() < 10) {
    date18 = date18 + "-" + "0" + String(date.getDate());
} else {
    date18 = date18 + "-" + String(date.getDate());
}
dob.setAttribute("max", date18);
dob.setAttribute("min", date55);
console.log(document.getElementById("dob"));
dob.addEventListener("input", () => validatedob(dob));
function validatedob(dob) {
    const date = new Date();
    const birthDate = new Date(dob.value);
    var age = date.getFullYear() - birthDate.getFullYear();
    var m = date.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
    if (age < 18 || age > 55) {
        console.log("Age is not between 18 and 55");
        dob.setCustomValidity("Age should be between 18 and 55");
        dob.reportValidity();
    } else {
        console.log("Age is between 18 and 55");
        dob.setCustomValidity("");
    }
}

const retrieveEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let retEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries
        .map((entry) => {
            const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
            const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
            const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
            const dateCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
            const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;

            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dateCell} ${acceptTermsCell}</tr>`;
            return row;
        })
        .join("\n");

    const table = `<table class="table-auto w-full">
            <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Password</th>
                <th class="px-4 py-2">Dob</th>
                <th class="px-4 py-2">Accepted terms?</th>
            </tr> ${tableEntries}
        </table>`;

    let details = document.getElementById("userEntries");
    details.innerHTML = table;
};

let userForm = document.getElementById("user-form");
let userEntries = [];

const saveUserForm = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;
    const password = document.getElementById("password").value;

    const entry = {
        name,
        email,
        dob,
        acceptTerms,
        password,
    };

    userEntries.push(entry);

    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("acceptTerms").checked = false;
    document.getElementById("password").value = "";
};

userForm.addEventListener("submit", (e) => saveUserForm(e));
displayEntries();
