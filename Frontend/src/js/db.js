let request = indexedDB.open("staffAtncDb", 1);
request.onerror = function(event) {
    console.error("Database error: ", event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    // Crée la table "staff" si elle n'existe pas
    if (!db.objectStoreNames.contains("staff")) {
        var objectStore = db.createObjectStore("staff", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("firstName", "firstName", { unique: false });
        objectStore.createIndex("lastName", "lastName", { unique: false });
        objectStore.createIndex("status", "status", { unique: false });
        objectStore.createIndex("department", "department", { unique: false });
        objectStore.createIndex("dob", "dob", { unique: false });
        objectStore.createIndex("registrationdate", "registrationdate", { unique: false });
        objectStore.createIndex("gender", "gender", { unique: false });
        console.log("Object store 'Staff' created successfully");
    }

    // Crée la table "register" si elle n'existe pas   
    if (!db.objectStoreNames.contains("attendance")) {
        var objectStore = db.createObjectStore("attendance", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("department", "departmen", { unique: false });
        objectStore.createIndex("worker", "worker", { unique: false });
        objectStore.createIndex("attendancetype", "attendancetypes", { unique: false });
        objectStore.createIndex("date", "date", { unique: false });
        objectStore.createIndex("enTime", "enTime", { unique: false });
        objectStore.createIndex("exTime", "exTime", { unique: false });
        console.log("Object store 'register' created successfully");
    }

    if (!db.objectStoreNames.contains("department")) {
        var objectStore = db.createObjectStore("department", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("description", "description", { unique: false });
        objectStore.createIndex("name", "name", { unique: false });
        console.log("Object store 'register' created successfully");
    }

request.onsuccess = function(event) {
    console.log("Database opened successfully");
};

}