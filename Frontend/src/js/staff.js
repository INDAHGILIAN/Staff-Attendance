function collectStaffData(){
    var firstName = document.getElementById('firstName').value;
    var lastName  = document.getElementById('lastName').value;
    var status    = document.getElementById('status').value;
    var department = document.getElementById('department-register').value;
    var dob = document.getElementById('dob').value;
    var registrationdate = document.getElementById('rgdate').value;
    var gender = document.getElementById('gender').value;

    var userData = { firstName, lastName, status, department, dob, registrationdate, gender };
console.log (userData);

 // Ajout dans IndexedDB
 const request = indexedDB.open("staffAtncDb", 1);
 request.onsuccess = function(event) {
     const db = event.target.result;
     const transaction = db.transaction(["staff"], "readwrite");
     const objectStore = transaction.objectStore("staff");
     const addRequest = objectStore.add(userData);



     addRequest.onerror = function() {
         console.error("Error adding staff: ", addRequest.error);
     };
 };

}


function listWorkers(){
    const table = document.getElementById("list-staff");
    table.innerHTML = "";
    const request = indexedDB.open ("staffAtncDb", 1);
     
    request.onsuccess = () => {
         const db = request.result;
         const transaction = db.transaction(["staff"], "readonly");
         const staffstore = transaction.objectStore("staff");
         const getAllRequest = staffstore.getAll();
         getAllRequest.onsuccess = () => {
            const stafflist = getAllRequest.result;
            stafflist.forEach((staff, index)=>{
                const row = table.insertRow();
                row.insertCell(0).innerText = index +  1;
                row.insertCell(1).innerText = staff.firstName;
                row.insertCell(2).innerText = staff.lastName;
                row.insertCell(3).innerText = staff.department;
                row.insertCell(4).innerText = staff.status;
                row.insertCell(5).innerText = staff.registrationdate;
                const actionsCell = row.insertCell();
                actionsCell.innerHTML = `
                    <select class="form-select">
                        <option>Choose...</option>
                        <option>Add Attendance</option>
                        <option>Edit</option>
                        <option>Delete</option>
                    </select>
                `;
            });
            console.log("Workers retrieved successfully");
        
         };
         getAllRequest.onerror = function() {
            console.error("Error retrieving workers: ", getAllRequest.error);
        };

  
};
    }