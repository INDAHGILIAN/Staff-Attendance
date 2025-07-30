function collectattendanceData(){
    var Name = document.getElementById('Name').value;
        var date    = document.getElementById('date').value;
    var status = document.getElementById('status').value;
    var department = document.getElementById('department').value;
          var userData = { Name, date, status, date,};
 console.log (userData);

 // Ajout dans IndexedDB
 const request = indexedDB.open("attendanceDb", 1);
 request.onsuccess = function(event) {
     const db = event.target.result;
     const transaction = db.transaction(["attendance"], "readwrite");
     const objectStore = transaction.objectStore("attendance");
     const addRequest = objectStore.add(userData);

     addRequest.onsuccess = function() {
         console.log("attendance added successfully");
     };

     addRequest.onerror = function() {
         console.error("Error adding staff: ", addRequest.error);
     };
 };

}

function attendancelist() {
    const table = document.getElementById("attendancelist");
    table.innerHTML = ""; // vide le tableu avant d'ajouter les lignes

    const request = indexedDB.open("staffAtnDb",1);
    request.onsuccess = function(event){
        const db = event.target.result;
        const transaction = db.transaction.(["Attendance"], "readonly");
        const objectStore = transaction.objectStore("Attendance");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function(){
            const AttendanceTable =getAllRequest.result;
            AttendanceTable.forEach((attendance, index) => {
                const row = table.insertRow();
                row.insertCell(0).innertext = index = 1;
                 row.insertCell(1).innertext = attendance.date;
                  row.insertCell(1).innertext = attendance.status;
                   row.insertCell(1).innertext = attendance.department;
                    

        });
        console.log("Attendance retrieved successfully");
        };

        getAllRequest.onerror = function() {
            console.error("Error retrieving workers:", getAllRequest.error);
        }

    }
}