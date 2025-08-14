/*var department = ["PDL", "MARKETING", "PRINTING", "MOUNTING", "TYPESETTING", "FINISHING", "ACOUNTING", "SECURITY", "SCREEN PRINTING", "CANTEEN"];
var description = ["Project Driving Lisence", "Manage entrance", "Print Everything", "Mount Before Print", "Apply Form To What To Print", "Finish The Work", "Manage Money", "Ensure Company Security", "Screen Printing", "Food Is Ready"];

// Pour chaque department et une decription on cree un objet
for (let i = 0; i < department.length; i++) {
    let request = indexedDB.open("staffAtncDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["department"], "readwrite");
        const objectStore = transaction.objectStore("department");
        const departmentData = {
            name: department[i],
            description: description[i]
        };
        const addRequest = objectStore.add(departmentData);

        addRequest.onerror = function() {
            console.error(`Error adding department ${department[i]}: `, addRequest.error);
        }; 
    };
}*/
 

function listDepartments() {
    const request = indexedDB.open("staffAtncDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["department"], "readonly");
        const objectStore = transaction.objectStore("department");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const departments = getAllRequest.result;

            // Pour Register Staff
            const selectRegisterStaff = document.getElementById("department-register");
            if (selectRegisterStaff) {
                selectRegisterStaff.innerHTML = '<option value="">Select...</option>';
                departments.forEach(department => {
                    const option = document.createElement("option");
                    option.value = department.name;
                    option.textContent = department.name;
                    selectRegisterStaff.appendChild(option);
                });
            }

            // Pour Register Attendance (si tu veux aussi remplir dynamiquement)
            const selectRegisterAttendance = document.getElementById("department");
            if (selectRegisterAttendance) {
                selectRegisterAttendance.innerHTML = '<option value="">Select...</option>';
                departments.forEach(department => {
                    const option = document.createElement("option");
                    option.value = department.name;
                    option.textContent = department.name;
                    selectRegisterAttendance.appendChild(option);
                });
            }
        };
    };
}


function listWorkersByDepartment() {
    const selectedDepartment = document.getElementById("department").value;
    const request = indexedDB.open("staffAtncDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["staff"], "readonly");
        const objectStore = transaction.objectStore("staff");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const allStaff = getAllRequest.result;
            // Filtre les workers selon le département choisi
            const filteredWorkers = allStaff.filter(staff => staff.department === selectedDepartment);

            // Exemple : remplir le select des workers
            const staffSelect = document.getElementById("worker");
            if (staffSelect) {
                staffSelect.innerHTML = '<option value="">Choose staff...</option>';
                filteredWorkers.forEach(staff => {
                    const option = document.createElement("option");
                    option.value =  staff.lastName + " " +staff.firstName; 
                    option.textContent = staff.lastName +" " + staff.firstName;
                    staffSelect.appendChild(option);
                
                });
            }
        };
    };
}