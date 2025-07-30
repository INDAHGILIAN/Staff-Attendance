function collectStaffData(){
    var firstName = document.getElementById('firstName').value;
    var lastName  = document.getElementById('lastName').value;
    var status    = document.getElementById('status').value;
    var department = document.getElementById('department').value;
    var dob = document.getElementById('dob').value;
    var date = document.getElementById('date').value;
    var gender = document.getElementById('gender').value;

    var userData = { firstName, lastName, status, department, dob, date, gender };
console.log (userData);

 // Ajout dans IndexedDB
 const request = indexedDB.open("staffAtncDb", 1);
 request.onsuccess = function(event) {
     const db = event.target.result;
     const transaction = db.transaction(["staff"], "readwrite");
     const objectStore = transaction.objectStore("staff");
     const addRequest = objectStore.add(userData);

     addRequest.onsuccess = function() {
         console.log("staff added successfully");
     };

     addRequest.onerror = function() {
         console.error("Error adding staff: ", addRequest.error);
     };
 };

}


function listWorkers(){
    const request = indexedDB.open ("staffDB",1);
     
    request.onsuccess = () => {
         const db = request.result;
         const transaction = db.transaction(["staff"], "readonly");
         const staffstore = transaction.objectStore("staff");

         const getAllRequest = staffstore.getAll();
          
         getAllRequest.onsuccess = () => {
            const stafflist = getAllRequest.result;
            conole.log("Staff List:", staffList);
        
         }

  
}
    }