
// Close all dropdowns when clicking outside
document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('.dropdown, .calendar-dropdown, .guests-dropdown, .filters-dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target) && !e.target.closest('.search-input-item')) {
            dropdown.style.display = 'none';
        }
    });
});

// From City Dropdown
const fromCity = document.getElementById('from-city');
const fromCityDropdown = document.getElementById('from-city-dropdown');
fromCity.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    fromCityDropdown.style.display = 'block';
});

const fromCityItems = fromCityDropdown.querySelectorAll('.dropdown-item');
fromCityItems.forEach(item => {
    item.addEventListener('click', () => {
        const city = item.getAttribute('data-city');
        const country = item.getAttribute('data-country');
        fromCity.querySelector('.input-value').textContent = city;
        fromCity.querySelector('.sub-label').textContent = country;
        fromCityDropdown.style.display = 'none';
    });
});

// To Destination Dropdown
const toDestination = document.getElementById('to-destination');
const toDestinationDropdown = document.getElementById('to-destination-dropdown');
toDestination.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    toDestinationDropdown.style.display = 'block';
});

const toDestinationItems = toDestinationDropdown.querySelectorAll('.dropdown-item');
toDestinationItems.forEach(item => {
    item.addEventListener('click', () => {
        const destination = item.getAttribute('data-destination');
        const type = item.getAttribute('data-type');
        toDestination.querySelector('.input-value').textContent = destination;
        toDestination.querySelector('.sub-label').textContent = type;
        toDestinationDropdown.style.display = 'none';
    });
});

// Calendar Dropdown
const departureDate = document.getElementById('departure-date');
const calendarDropdown = document.getElementById('calendar-dropdown');
const month1 = document.getElementById('month1');
const month2 = document.getElementById('month2');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date(2025, 7, 3); // Start from August 2025
let selectedDate = new Date(2025, 7, 3); // Default selected date (3 Aug 2025)

function populateCalendar() {
    const month1Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const month2Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    // Populate Month 1
    month1.querySelector('.month-name').textContent = month1Date.toLocaleString('default', { month: 'long', year: 'numeric' });
    const month1Grid = month1.querySelector('.calendar-grid');
    month1Grid.innerHTML = month1Grid.innerHTML.split('</div>').slice(0, 7).join('</div>') + '</div>'; // Keep day names
    const firstDay1 = month1Date.getDay();
    const daysInMonth1 = new Date(month1Date.getFullYear(), month1Date.getMonth() + 1, 0).getDate();
    for (let i = 0; i < firstDay1; i++) {
        const emptyDay = document.createElement('div');
        month1Grid.appendChild(emptyDay);
    }
    for (let i = 1; i <= daysInMonth1; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        if (i === selectedDate.getDate() && month1Date.getMonth() === selectedDate.getMonth() && month1Date.getFullYear() === selectedDate.getFullYear()) {
            day.classList.add('active');
        }
        day.addEventListener('click', () => {
            selectedDate = new Date(month1Date.getFullYear(), month1Date.getMonth(), i);
            updateSelectedDate();
            populateCalendar();
            calendarDropdown.style.display = 'none';
        });
        month1Grid.appendChild(day);
    }

    // Populate Month 2
    month2.querySelector('.month-name').textContent = month2Date.toLocaleString('default', { month: 'long', year: 'numeric' });
    const month2Grid = month2.querySelector('.calendar-grid');
    month2Grid.innerHTML = month2Grid.innerHTML.split('</div>').slice(0, 7).join('</div>') + '</div>'; // Keep day names
    const firstDay2 = month2Date.getDay();
    const daysInMonth2 = new Date(month2Date.getFullYear(), month2Date.getMonth() + 1, 0).getDate();
    for (let i = 0; i < firstDay2; i++) {
        const emptyDay = document.createElement('div');
        month2Grid.appendChild(emptyDay);
    }
    for (let i = 1; i <= daysInMonth2; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        if (i === selectedDate.getDate() && month2Date.getMonth() === selectedDate.getMonth() && month2Date.getFullYear() === selectedDate.getFullYear()) {
            day.classList.add('active');
        }
        day.addEventListener('click', () => {
            selectedDate = new Date(month2Date.getFullYear(), month2Date.getMonth(), i);
            updateSelectedDate();
            populateCalendar();
            calendarDropdown.style.display = 'none';
        });
        month2Grid.appendChild(day);
    }
}

function updateSelectedDate() {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    departureDate.querySelector('.input-value').textContent = selectedDate.toLocaleDateString('en-US', options);
    departureDate.querySelector('.sub-label').textContent = selectedDate.toLocaleString('default', { weekday: 'long' });
}

departureDate.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    calendarDropdown.style.display = 'block';
    populateCalendar();
});

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    populateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    populateCalendar();
});

// Rooms & Guests Dropdown
const roomsGuests = document.getElementById('rooms-guests');
const guestsDropdown = document.getElementById('guests-dropdown');
const roomsMinus = document.getElementById('rooms-minus');
const roomsPlus = document.getElementById('rooms-plus');
const roomsValue = document.getElementById('rooms-value');
const adultsMinus = document.getElementById('adults-minus');
const adultsPlus = document.getElementById('adults-plus');
const adultsValue = document.getElementById('adults-value');
const childrenMinus = document.getElementById('children-minus');
const childrenPlus = document.getElementById('children-plus');
const childrenValue = document.getElementById('children-value');

roomsGuests.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    guestsDropdown.style.display = 'block';
});

function updateGuestsDisplay() {
    const adults = parseInt(adultsValue.textContent);
    const children = parseInt(childrenValue.textContent);
    const rooms = parseInt(roomsValue.textContent);
    roomsGuests.querySelector('.input-value').textContent = `${adults} Adults, ${children} Children`;
    roomsGuests.querySelector('.sub-label').textContent = `${rooms} Rooms`;
}

roomsMinus.addEventListener('click', () => {
    let value = parseInt(roomsValue.textContent);
    if (value > 1) {
        roomsValue.textContent = value - 1;
        updateGuestsDisplay();
    }
});

roomsPlus.addEventListener('click', () => {
    let value = parseInt(roomsValue.textContent);
    roomsValue.textContent = value + 1;
    updateGuestsDisplay();
});

adultsMinus.addEventListener('click', () => {
    let value = parseInt(adultsValue.textContent);
    if (value > 1) {
        adultsValue.textContent = value - 1;
        updateGuestsDisplay();
    }
});

adultsPlus.addEventListener('click', () => {
    let value = parseInt(adultsValue.textContent);
    adultsValue.textContent = value + 1;
    updateGuestsDisplay();
});

childrenMinus.addEventListener('click', () => {
    let value = parseInt(childrenValue.textContent);
    if (value > 0) {
        childrenValue.textContent = value - 1;
        updateGuestsDisplay();
    }
});

childrenPlus.addEventListener('click', () => {
    let value = parseInt(childrenValue.textContent);
    childrenValue.textContent = value + 1;
    updateGuestsDisplay();
});

// Filters Dropdown
const filters = document.getElementById('filters');
const filtersDropdown = document.getElementById('filters-dropdown');
const durationSlider = document.getElementById('duration-slider');
const durationValue = document.getElementById('duration-value');
const budgetOptions = document.querySelectorAll('.budget-options .budget-option[data-budget]');
const starOptions = document.querySelectorAll('.budget-options .budget-option[data-stars]');

filters.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    filtersDropdown.style.display = 'block';
});

durationSlider.addEventListener('input', () => {
    durationValue.textContent = `${durationSlider.value} Nights`;
    updateFiltersDisplay();
});

budgetOptions.forEach(option => {
    option.addEventListener('click', () => {
        budgetOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        updateFiltersDisplay();
    });
});

starOptions.forEach(option => {
    option.addEventListener('click', () => {
        starOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        updateFiltersDisplay();
    });
});

function updateFiltersDisplay() {
    const duration = durationSlider.value;
    const budget = document.querySelector('.budget-option[data-budget].active').textContent;
    const stars = document.querySelector('.budget-option[data-stars].active').textContent;
    filters.querySelector('.input-value').textContent = `${budget}`;
    filters.querySelector('.sub-label').textContent = `${stars}, ${duration} Nights`;
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown, .calendar-dropdown, .guests-dropdown, .filters-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}
