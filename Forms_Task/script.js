// Function to create and append an element with optional class and text content
function createElement(tag, classes = [], textContent = '') {
    const element = document.createElement(tag);
    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    if (textContent !== '') {
        element.textContent = textContent;
    }
    return element;
}

// Function to create a form input field
function createInput(name, type, placeholder) {
    const input = createElement('input', ['form-control']);
    input.setAttribute('name', name);
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    return input;
}

// Function to create a select element with options
function createSelect(name, options) {
    const select = createElement('select', ['form-select']);
    select.setAttribute('name', name);
    options.forEach(option => {
        const optionElement = createElement('option', [], option.text);
        optionElement.setAttribute('value', option.value);
        select.appendChild(optionElement);
    });
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

// Create container div
const container = createElement('div', ['container-fluid', 'p-5']);

// Create card elements
const card = createElement('div', ['card']);
const cardHeader = createElement('div', ['card-header', 'p-3'], 'User Form');
const cardBody = createElement('div', ['card-body']);

// Create form element
const form = createElement('form');

// Add form rows
const fields = [
    { name: 'first_name', placeholder: 'First Name' },
    { name: 'last_name', placeholder: 'Last Name' },
    { name: 'address', placeholder: 'Address' },
    { name: 'pincode', placeholder: 'Pincode' },
    { name: 'gender', placeholder: 'Gender' },
    { name: 'food_choice', placeholder: 'Choice of Food' },
    { name: 'state', placeholder: 'State' },
    { name: 'country', placeholder: 'Country' }
];

fields.forEach(field => {
    const row = createElement('div', ['row']);
    const col = createElement('div', ['col-6', 'p-3']);
    if (field.name === 'gender') {
        col.appendChild(createSelect(field.name, [
            { value: 'male', text: 'Male' },
            { value: 'female', text: 'Female' }
        ]));
    } else if (field.name === 'food_choice') {
        col.appendChild(createSelect(field.name, foodOptions));
    } else {
        col.appendChild(createInput(field.name, 'text', field.placeholder));
    }
    row.appendChild(col);
    form.appendChild(row);
});

// Append a submit button
const submitButton = createElement('button', ['btn', 'btn-primary', 'mt-3'], 'Submit');
form.appendChild(submitButton);

// Create table to append form data
const table = createElement('table', ['table', 'table-striped', 'mt-5']);
const tableHeader = createElement('thead');
const tableHeaderRow = createElement('tr');
const headers = ['First Name', 'Last Name', 'Address', 'Pincode', 'Gender', 'Choice of Food', 'State', 'Country'];
headers.forEach(headerText => {
    const th = createElement('th', [], headerText);
    tableHeaderRow.appendChild(th);
});
tableHeader.appendChild(tableHeaderRow);
table.appendChild(tableHeader);

const tableBody = createElement('tbody');
table.appendChild(tableBody);

// Add form submission handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const newRow = document.createElement('tr');
    headers.forEach(header => {
        const cell = document.createElement('td');
        cell.textContent = formData.get(header.toLowerCase().replace(' ', '_'));
        newRow.appendChild(cell);
    });
    tableBody.appendChild(newRow);
    form.reset();
});

// Assemble elements
card.appendChild(cardHeader);
card.appendChild(cardBody);
cardBody.appendChild(form);
container.appendChild(card);
container.appendChild(table);
document.body.appendChild(container);
