// Saving form inputs to local storage and rendering them in a table
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const idInput = document.getElementById("studentId");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const submitButton = form.querySelector("button");
    const tableBody = document.querySelector("tbody");
    const tableContainer = document.querySelector("table");

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let editIndex = -1; // Track index for editing

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    } // Save students array to local storage

    function renderTable() {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            let row = `<tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>
                    <button class='edit-btn' data-index='${index}'>Edit</button>
                    <button class='delete-btn' data-index='${index}'><i class="fa-solid fa-trash fa-2xl" style="color: #ff0033;"></i></button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        }); // Table rendering dynamically inside students section

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                editStudent(this.dataset.index);
            }); //Edit button, when clicked sends student's data inside form fields.
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                deleteStudent(this.dataset.index);
            }); //Delete button
        });

        checkScrollBar();
    }
// Make sure all info entered type is accordingly. eg, name can't have numbers.
    function validateInputs() {
        let nameValid = /^[a-zA-Z ]+$/.test(nameInput.value.trim());
        let idValid = /^\d+$/.test(idInput.value.trim());
        let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        let phoneValid = /^\d{10}$/.test(phoneInput.value.trim());
        return nameValid && idValid && emailValid && phoneValid;
    }

    function checkScrollBar() {
        if (tableBody.rows.length > 6) {
            tableContainer.style.overflowY = "auto";
            tableContainer.style.maxHeight = "355px";
            tableContainer.style.display = "block";
        } else {
            tableContainer.style.maxHeight = "none";
        } //Dynamically added Scrollbar
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!validateInputs()) {
            alert("Please enter valid details."); //Output if empty field or wrong info is filled.
            return;
        }
        let student = {
            name: nameInput.value.trim(),
            id: idInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            address: addressInput.value.trim()
        }; // Entered info is removed and taken to local storage in an array alled "student."
        if (editIndex === -1) {
            students.push(student);
        } else {
            students[editIndex] = student;
            editIndex = -1;
            submitButton.textContent = "Submit";
        }
        saveToLocalStorage();
        renderTable();
        form.reset(); //Stored then Rendered Table then Form is reset.
    });

    function editStudent(index) {
        let student = students[index];
        nameInput.value = student.name;
        idInput.value = student.id;
        emailInput.value = student.email;
        phoneInput.value = student.phone;
        addressInput.value = student.address;
        submitButton.textContent = "Update";
        editIndex = index;
    } // function for Editing student's info

    function deleteStudent(index) {
        students.splice(index, 1);
        saveToLocalStorage();
        renderTable();
    } // function for deleting student's info

    renderTable(); // Final Table Render.
});