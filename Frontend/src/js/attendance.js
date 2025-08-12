function collectAttendanceData(){
    var firstName = document.getElementById("worker").value;
     var department = document.getElementById("Choose department").value;
     var attendanceType = document.getElementById("attendance type").value;
     var EntryTime = document.getElementById("Entry Time").value;
    var ExitTime = document.getElementById("Exit Time").value;
      var date = document.getElementById("date").value;

    var userData = { firstName, department, attendanceType, EntryTime, ExitTime, date };
    console.log(userData);

    // Add to IndexedDB
    const request = indexedDB.open("staffAtncDb", 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["attendance"], "readwrite");
        const objectStore = transaction.objectStore("attendance");
        const addRequest = objectStore.add(userData);

        addRequest.onsuccess = function() {
            console.log("attendance added successfully");
        };

        addRequest.onerror = function() {
            console.error("Error adding attendance: ", addRequest.error);
        };
    };
}





function listAttendance(){
    const table = document.getElementById("list-attendance");
    table.innerHTML = "";
    const request = indexedDB.open ("staffAtncDb", 1);
     
    request.onsuccess = () => {
         const db = request.result;
         const transaction = db.transaction(["attendance"], "readonly");
         const attendancestore = transaction.objectStore("attendance");
         const getAllRequest = attendancestore.getAll();
         getAllRequest.onsuccess = () => {
            const attendancelist = getAllRequest.result;
            attendancelist.forEach((attendance, index)=>{
                const row = table.insertRow();
                row.insertCell(0).innerText = index +  1;
                 row.insertCell(1).innerText = attendance.firstName;
                row.insertCell(2).innerText = attendance.department;
                row.insertCell(3).innerText = attendance.attendanceType; 
                row.insertCell(4).innerText = attendance.entryTime;
                row.insertCell(5).innerText = attendance.exitTime;
                row.insertCell(6).innerText = attendance.date;
                
            console.log("attendance retrieved successfully");
        
         });
         getAllRequest.onerror = function() {
            console.error("Error retrieving attendance: ", getAllRequest.error);
        };

  
};
    }
}
