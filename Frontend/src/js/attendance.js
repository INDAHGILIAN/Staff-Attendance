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