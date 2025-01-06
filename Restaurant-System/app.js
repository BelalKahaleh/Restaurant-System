// Array to store customer orders
const customers = [];

// Constructor for creating a customer object
function Customer(fullName, password, dob, gender, orderTypes, orderOption, imageUrl, phone) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.orderTypes = orderTypes;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
  this.phone = phone;
}

// Function to render customer cards
function renderCustomerCards() {
  const cardContainer = document.querySelector('main .row:last-child');

  // Clear existing content
  cardContainer.innerHTML = '';

  // Render each customer
  customers.forEach((customer) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    card.innerHTML = `
      <div class="card shadow-sm">
        <img src="${customer.imageUrl}" class="card-img-top" alt="${customer.fullName}">
        <div class="card-body">
          <h5 class="card-title">${customer.fullName}</h5>
          <p class="card-text"><strong>Gender:</strong> ${customer.gender}</p>
          <p class="card-text"><strong>Date of Birth:</strong> ${customer.dob}</p>
          <p class="card-text"><strong>Phone:</strong> ${customer.phone}</p>
          <p class="card-text"><strong>Order Type:</strong> ${customer.orderTypes.join(', ')}</p>
          <p class="card-text"><strong>Order Option:</strong> ${customer.orderOption}</p>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();

  // Read form data
  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const phone = document.getElementById('phone').value;

  const orderTypes = Array.from(document.querySelectorAll('input[name="orderType"]:checked'))
    .map(input => input.value);

  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  const imageUrl = `assets/${gender.toLowerCase()}.jpg`; // Assumes images are named `male.jpg`, `female.jpg`, etc.

  // Create a new customer object
  const newCustomer = new Customer(fullName, password, dob, gender, orderTypes, orderOption, imageUrl, phone);

  // Add customer to the array
  customers.push(newCustomer);

  // Save customers to localStorage
  localStorage.setItem('customers', JSON.stringify(customers));

  // Clear the form
  event.target.reset();

  // Re-render customer cards
  renderCustomerCards();
}

// Load customers from localStorage on page load
window.onload = function () {
  const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
  storedCustomers.forEach((customer) => customers.push(customer));
  renderCustomerCards();
};

// Attach form submission handler
document.getElementById('order-form').addEventListener('submit', handleFormSubmission);
