/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Data object format: {
//   name: {
//     title: "Miss",
//     first: "Ethel",
//     last: "Dean",
//   },
//   email: "ethel.dean@example.com",
//   registered: {
//     date: "12-15-2005",
//     age: 15,
//   },
//   picture: {
//     large: "https://randomuser.me/api/portraits/women/25.jpg",
//     medium: "https://randomuser.me/api/portraits/med/women/25.jpg",
//     thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
//   },
// },

const linkList = document.querySelector(".link-list");
const studentList = document.querySelector(".student-list");
const header = document.querySelector("header");
const search = document.getElementById("search");

function addSearch() {
  const searchBar = `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `;
  header.insertAdjacentHTML("beforeend", searchBar);
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  const itemsPerPage = list.length < 9 ? list.length : 9;
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  studentList.innerHTML = "";

  list.forEach((student, i) => {
    if (startIndex <= i && i < endIndex) {
      const studentCard = `
        <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
          <h3>${student.name.first} ${student.name.last}</h3>
          <span class="email">${student.email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${student.registered.date}</span>
        </div>
        </li>
      `;
      studentList.insertAdjacentHTML("beforeend", studentCard);
    }
  });
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const itemsPerPage = list.length < 9 ? list.length : 9;
  linkList.innerHTML = "";

  let i = 0;
  do {
    const button = `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `;
    linkList.insertAdjacentHTML("beforeend", button);
    i++;
  } while (i < list.length / itemsPerPage);
  linkList.firstElementChild.firstElementChild.className = "active";
}

linkList.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    document
      .querySelectorAll("li button")
      .forEach((button) => (button.className = ""));
    button.className = "active";

    showPage(data, +button.textContent);
  }
});

header.addEventListener("keyup", (e) => {
  const searchText = document.getElementById("search").value;
  const list = data.filter(
    (student) =>
      student.name.first.includes(searchText) ||
      student.name.last.includes(searchText)
  );
  showPage(list, 1);
  addPagination(list);
  // if(e.code === "Backspace" && input.value === '')
});

// Call functions
addSearch();
showPage(data, 1);
addPagination(data);
