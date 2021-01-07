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
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/**
 * @function makeElement
 * @description Creates an element along with attributes
 * @param {String} elementTag The element type you want to create
 * @param {Object=} attributes Attributes and their values are passed in as property/value pairs
 * @returns {Element} The created element
 */
function makeElement(elementTag, attributes) {
  const element = document.createElement(elementTag);
  if (attributes)
    for (let attribute in attributes) {
      element[attribute] = attributes[attribute] || "";
    }
  return element;
}

function buildCard(list) {}

function showPage(list, page) {
  const itemsPerPage = list.length < 9 ? list.length : 9;
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  studentList.innerHTML = "";

  list.forEach((student, i) => {
    if (startIndex <= i && i < endIndex) {
      // const li = makeElement("li", { "className": "student-item cf" });
      // const studentDeets = makeElement("div", {
      //   "className": "student-details",
      // });
      // li.appendChild(studentDeets);
      // studentDeets.appendChild(
      //   makeElement("img", {
      //     "className": "avatar",
      //     "src": student.picture.thumbnail,
      //     "alt": "Profile Picture",
      //   })
      // );
      // studentDeets.appendChild(
      //   makeElement("h3", {
      //     "textContent": student.name.first + " " + student.name.last,
      //   })
      // );
      // studentDeets.appendChild(
      //   makeElement("span", {
      //     "className": "email",
      //     "textContent": student.email,
      //   })
      // );
      // const joinedDeets = makeElement("div", { "className": "joined-details"});
      // li.appendChild(joinedDeets);
      // joinedDeets.appendChild(
      //   makeElement("span", {
      //     "className": "date",
      //     "textContent": student.registered.date,
      //   })
      // );

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
  } while (i <= list.length / itemsPerPage);
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

// Call functions
showPage(data, 1);
addPagination(data);
