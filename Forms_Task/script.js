// Function to create and append an element with optional class and text content
function createElement(tag, classes = [], textContent = '') {
    // Create a new HTML element
    const element = document.createElement(tag);
    if (classes.length > 0) {
        element.classList.add(...classes); // Add specified classes to the element
    }
    if (textContent !== '') {
        element.textContent = textContent; // Set text content of the element
    }
    // Return the created element
    return element;
}

// Function to create a form input field
function createInput(name, type, placeholder, id, options = []) {
    if (type === 'radio' && options.length > 0) {
        const container = createElement('div');
        options.forEach(option => {
            const label = createElement('label', ['radio-label', 'ms-5'], option.text);
            const radio = createElement('input', ['ms-3']);
            radio.setAttribute('type', type);
            radio.setAttribute('name', name);
            radio.setAttribute('value', option.value);
            if (option.checked) {
                radio.checked = true;
            }
            label.appendChild(radio);
            container.appendChild(label);
        });
        return container; // Return the container holding radio buttons
    } else {
        const input = createElement('input', ['form-control']);
        input.setAttribute('name', name);
        input.setAttribute('type', type);
        input.setAttribute('id', id);
        input.setAttribute('placeholder', placeholder);
        input.required = true;
        return input;
    }
}


// Function to create a select element with options
function createSelect(name, options, id) {
    // Create a select element with 'form-select' class
    const select = createElement('select', ['form-select']);
    select.setAttribute('name', name); // Set select name attribute
    select.setAttribute('id', id);     // Set select id attribute
    options.forEach(option => { // Loop through options array
        // Create an option element with text content
        const optionElement = createElement('option', [], option.text);
        optionElement.setAttribute('value', option.value); // Set option value attribute
        select.appendChild(optionElement); // Append option to select element
    });
    // Return the created select element
    return select;
}

// Array of select options
const foodOptions = [
    { value: 'veg', text: 'Veg' },
    { value: 'non-veg', text: 'Non-Veg' },
    { value: 'fruits', text: 'Fruits' },
    { value: 'meals', text: 'Meals' },
    { value: 'pizza', text: 'Pizza' }
];

// Create a container element
const container = createElement('div', ['container-fluid', 'p-5']);

// Create an h1 element
const h1Tag = createElement('h1', ['text-center', 'p-3'], 'DOM Manipulation with Forms and Tables');
h1Tag.setAttribute('id', 'title'); // Set h1 element id attribute
container.appendChild(h1Tag); // Append h1 element to container

// Create paragraph element
const paragraphTag = createElement('p', ['text-center'], 'User fill the forms and data will be appending the tables');
paragraphTag.setAttribute('id', 'description'); // Set paragraph element id attribute
container.appendChild(paragraphTag); // Append paragraph element to container

// Create card elements
const card = createElement('div', ['card']);
// Create a card header element
const cardHeader = createElement('div', ['card-header', 'p-3', 'text-center'], 'User Form');
// Create a card body element
const cardBody = createElement('div', ['card-body']);

// Create form element
const form = createElement('form');
form.setAttribute('id', 'form'); // Set form id attribute

// Add form rows and Define form fields
const fields = [
    { name: 'first_name', placeholder: 'First Name', id: 'first-name' }, // First name field
    { name: 'last_name', placeholder: 'Last Name', id: 'last-name' }, // Last name field
    { name: 'address', placeholder: 'Address', id: 'address' }, // Address field
    { name: 'pincode', placeholder: 'Pincode', id: 'pincode' }, // Pincode field
    { name: 'gender', placeholder: 'Gender', id: 'gender' }, // Gender field
    { name: 'food_choice', placeholder: 'Choice of Food', id: 'food-choice' }, // Choice of Food field
    { name: 'state', placeholder: 'State', id: 'state' }, // State field
    { name: 'country', placeholder: 'Country', id: 'country' } // Country field
];

// Loop through form fields
fields.forEach((field, index) => {
    if (index % 2 === 0) { // Check if index is even
        const row = createElement('div', ['row']); // Create a row element
        form.appendChild(row); // Append row to form
    }

    // Get the last row
    const row = form.lastElementChild;
    // Create a column element
    const col = createElement('div', ['col-6', 'p-3', 'form-group']);

    // If field is gender
    if (field.name === 'gender') {
        // Create radio buttons for gender
        col.appendChild(createInput(field.name, 'radio', field.placeholder, field.id, [
            { value: 'male', text: 'Male', checked: true },
            { value: 'female', text: 'Female' }
        ]));
    } else if (field.name === 'food_choice') { // If field is choice of food
        // Create a select element with food options
        col.appendChild(createSelect(field.name, foodOptions, field.id));
    } else if (field.name === 'address') { // If field is choice of food
        // Create a select element with food options
        const textArea = createElement('textarea', ['form-control']);
        textArea.setAttribute('name', 'address');
        textArea.setAttribute('id', 'address')
        textArea.setAttribute('placeholder', field.placeholder)
        col.appendChild(textArea);
    } else {
        // Create an input element
        col.appendChild(createInput(field.name, 'text', field.placeholder, field.id));
    }
    row.appendChild(col); // Append column to row
});

// Append a submit button
const submitButton = createElement('button', ['btn', 'btn-primary', 'mt-3'], 'Submit');
submitButton.setAttribute('id', 'submit'); // Set submit button id attribute
form.appendChild(submitButton); // Append submit button to form

const tableResponsive = createElement('div', ['table-responsive']);
// Create table to append form data
const table = createElement('table', ['table', 'table-striped', 'table-hover', 'mt-5']);
// Create a table header element
const tableHeader = createElement('thead');
// Create a table header row element
const tableHeaderRow = createElement('tr');
// Define table headers
const headers = ['First Name', 'Last Name', 'Address', 'Pincode', 'Gender', 'Choice of Food', 'State', 'Country'];
// Loop through headers
headers.forEach(headerText => {
    // Create a table header cell
    const th = createElement('th', ['bg-dark', 'text-white'], headerText);
    // Append cell to header row
    tableHeaderRow.appendChild(th);
});

// Append header row to header
tableHeader.appendChild(tableHeaderRow);
// Append header to table
table.appendChild(tableHeader);

// Create a table body element
const tableBody = createElement('tbody');
// Append body to table
table.appendChild(tableBody);

// Add form submission handler
form.addEventListener('submit', function (event) { // Add submit event listener to form
    // Prevent default form submission
    // prevents the default form submission behavior, 
    // allowing us to handle the form submission ourselves. The function retrieves the values
    event.preventDefault();
    const formData = new FormData(form); // Get form data
    // Create a new table row
    const newRow = document.createElement('tr');
    // Loop through headers
    headers.forEach(header => {
        // Create a table cell
        const cell = document.createElement('td');
        let value = formData.get(header.toLowerCase().replace(' ', '_')); // Get form data value
        // If header is Choice of Food
        if (header === 'Choice of Food') {
            const select = document.getElementById('food-choice'); // Get select element
            value = select.options[select.selectedIndex].text; // Get selected option text
        }
        cell.textContent = value; // Set cell text content
        newRow.appendChild(cell); // Append cell to row
    });
    // Append row to table body
    tableBody.appendChild(newRow);
    form.reset(); // Reset form
});

// Assemble elements
card.appendChild(cardHeader); // Append card header to card
card.appendChild(cardBody); // Append card body to card
cardBody.appendChild(form); // Append form to card body
tableResponsive.appendChild(table); // Append the table to div
container.appendChild(card); // Append card to container
container.appendChild(tableResponsive); // Append table to container
document.body.appendChild(container); // Append container to body
