let db

const request = indexedDB.open("attendanceDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;

    const store = db.createObjectStore("attendance",{ KeyPath: "id", autoIncrement: true});
    
    store.createIndex("Last name", "Last name", {unique: false});
    store.createIndex("Gender", "Gender", {unique: false});
    store.createIndex("DOb", "date", {unique: false});
    store.createIndex("Department", "Department", {unique: false});
    store.createIndex("status", "status", {unique: false});

      }
      request.onsuccess = function(event) {
        db = event.target.result;
        loadAttendanceData();
      }

      request.onerror = function(event) {
        alert("Error Opening IndexedDB: " +
        event.target.errorcode);
      };
    
