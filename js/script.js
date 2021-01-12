const linkList = document.querySelector(".link-list");
const studentList = document.querySelector(".student-list");
const header = document.querySelector("header");

/**
 * @function addSearch
 * @description adds a search bar to the DOM
 */
function addSearch() {
  const searchBar = `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `;
  header.insertAdjacentHTML("beforeend", searchBar);
}

/**
 * @function showPage
 * @param {array} list - array of student objects
 * @param {number} page
 * @description creates student information cards
 *    and posts them to the DOM
 */
function showPage(list, page) {
  let startIndex = page * 9 - 9;
  let endIndex = page * 9;
  let ul = document.querySelector(".student-list");
  ul.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      ul.insertAdjacentHTML(
        "beforeend",
        `<li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${list[i].registered.date}</span>
        </div>
      </li>`
      );
    }
  }
}

/**
 * @function addPagination
 * @param {array} list - array of student objects
 * @description creates the correct number of page buttons
 */
function addPagination(list) {
  linkList.innerHTML = "";

  let i = 1;
  do {
    const button = `
      <li>
        <button type="button">${i}</button>
      </li>
    `;
    linkList.insertAdjacentHTML("beforeend", button);
    i++;
  } while (i <= Math.ceil(list.length / 9));
  linkList.firstElementChild.firstElementChild.className = "active";
}

/**
 * @function addNoResults
 * @returns {boolean} always returns false
 * @description clears list elements from page and displays lack of matches
 */
function addNoResults() {
  studentList.innerHTML = "";
  linkList.innerHTML = "";
  studentList.insertAdjacentHTML(
    "beforeend",
    `<h3 class="no-results">No results found</h3>`
  );
  return false;
}

/**
 * @function searchPage
 * @param {array} list - array of student objects
 * @description checks search field against names of all students
 */
function searchPage(list) {
  const searchText = document.getElementById("search").value.toLowerCase();
  const matchList = list.filter((student) => {
    const name = student.name.first + " " + student.name.last;
    return name.toLowerCase().includes(searchText);
  });
  return matchList.length ? matchList : addNoResults();
}

/**
 * @listens linkList
 * @description handles display change on a page button click
 */
linkList.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    document
      .querySelectorAll("li button")
      .forEach((button) => (button.className = ""));
    button.className = "active";
    const list = searchPage(data);
    if (list) showPage(list, +button.textContent);
  }
});

/**
 * @listens header
 * @description on a button or search image click, calls a search of the page
 * and display change
 */
header.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.tagName === "IMG") {
    const list = searchPage(data);
    if (list) {
      showPage(list, 1);
      addPagination(list);
    }
  }
});

/**
 * @listens header
 * @description on a keyup, calls a search of the page and display change
 */
header.addEventListener("keyup", (e) => {
  const list = searchPage(data);
  if (list) {
    showPage(list, 1);
    addPagination(list);
  }
});

addSearch();
showPage(data, 1);
addPagination(data);
