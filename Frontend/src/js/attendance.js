function collectAttendanceData(){
    var name = document.getElementById("worker").value;
     var department = document.getElementById("department").value;
     var attendancetype = document.getElementById("attendanceType").value;
     var entryTime = document.getElementById("entryTime").value;
    var exitTime = document.getElementById("exitTime").value;
      var date = document.getElementById("date").value;

    var userData = {  name, department, attendancetype, entryTime, exitTime, date };
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
                 row.insertCell(1).innerText = attendance.name;
                row.insertCell(2).innerText = attendance.department;
                row.insertCell(3).innerText = attendance.attendancetype; 
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
