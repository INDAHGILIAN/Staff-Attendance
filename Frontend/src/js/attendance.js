function collectattendanceData(){
    var department = document.getElementById('department').value;
    var worker = document.getElementById('worker').value;
    var attendancetype = document.getElementById('attendancetype').value;
    var date = document.getElementById('date').value;
    var exTime = document.getElementById('exTime').value;
    var enTime = document.getElementById('enTime').value;

    var userData = { department, worker, attendancetype, date, exTime, enTime };
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
            const stafflist = getAllRequest.result;
            stafflist.forEach((attendance, index)=>{
                const row = table.insertRow();
                row.insertCell(0).innerText = index +  1;
                row.insertCell(1).innerText = attendance.Num;
                row.insertCell(2).innerText = attendance.Name;
                row.insertCell(3).innerText = attendance.Department;
                row.insertCell(4).innerText = attendance.Status;
                row.insertCell(5).innerText = attendance.EixtTime;
                row.insertCell(6).innerText = attendance.EntryTime;
                row.insertCell(7).innerText = attendance.Date;
               
            });
            console.log("attendance retrieved successfully");
        
         };
         getAllRequest.onerror = function() {
            console.error("Error retrieving attendance: ", getAllRequest.error);
        };

  
};
    }
