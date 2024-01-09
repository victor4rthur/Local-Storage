// Select elements on the page
const addItems = document.querySelector('.add-items'); // Form for adding items
const itemsList = document.querySelector('.plates'); // List of items
const items = JSON.parse(localStorage.getItem('items')) || []; // Retrieve items from local storage or set to an empty array

const checkAllBtn = document.querySelector('.check-all'); // Button to check/uncheck all items

// Create the functionality to add an item
function addItem(e) {
    e.preventDefault();

    // Get the text from the input field
    const text = (this.querySelector('[name=item')).value;
    const item = {
        text,
        done: false
    };

    // Add the new item, update the list, and store in local storage
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));

    // Reset the form
    this.reset();
}

// Populate the list of items
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');

    // Update the "Check All" button text based on the state of all checkboxes
    checkAllBtn.textContent = plates.every(plate => plate.done) ? 'Uncheck All' : 'Check All';
}

// Function to handle checking/unchecking an item
function toggleDone(e) {
    if (!e.target.matches('input')) return; // Skip if not an input element
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

// Function to handle "Check All" button click
function checkAll() {
    // Toggle the checked status for all items
    items.forEach(item => item.done = !items.every(plate => plate.done));

    // Update local storage and refresh the list
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

// Event listeners
addItems.addEventListener('submit', addItem); // Listen for form submission to add an item
itemsList.addEventListener('click', toggleDone); // Listen for clicks on the list to toggle item status
checkAllBtn.addEventListener('click', checkAll); // Listen for "Check All" button clicks

// Initial population of the list
populateList(items, itemsList);