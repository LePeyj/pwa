var db;
 
function indexedDBOk() {
    return "indexedDB" in window;
}
 
document.addEventListener("DOMContentLoaded", function() {
 
    //No support? Go in the corner and pout.
    if(!indexedDBOk) return;
 
    var openRequest = indexedDB.open("AOV",1);
 
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
 
        if(!thisDB.objectStoreNames.contains("people")) {
            thisDB.createObjectStore("people", {autoIncrement:true});
        }
    }
 
    openRequest.onsuccess = function(e) {
        console.log("running onsuccess");
 
        db = e.target.result;
 
        //Listen for add clicks
        document.querySelector("#loginSubmit").addEventListener("click", addPerson, false);
        document.querySelector("#getPerson").addEventListener("click", getPerson, false);
    }
 
    openRequest.onerror = function(e) {
        //Do something for the error
    }
 
},false);
 
function addPerson(e) {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
 
    console.log("About to add "+username+"/"+password);
 
    var transaction = db.transaction(["people"],"readwrite");
    var store = transaction.objectStore("people");
 
    //Define a person
    var person = {
        username:username,
        password:password,
        created:new Date()
    }
 
    //Perform the add
    var request = store.add(person);
 
    request.onerror = function(e) {
        console.log("Error",e.target.error.name);
        //some type of error handler
    }
 
    request.onsuccess = function(e) {
        console.log("Data was successfully saved!");
    }
}

function getPerson(e) {
    var key = document.querySelector("#key").value;
    if(key === "" || isNaN(key)) return;
 
    var transaction = db.transaction(["people"],"readonly");
    var store = transaction.objectStore("people");
 
    var request = store.get(Number(key));
 
    request.onsuccess = function(e) {
 
        var result = e.target.result;
        console.dir(result);
        if(result) {
            var s = "<h2>Key "+key+"</h2><p>";
            for(var field in result) {
                s+= field+"="+result[field]+"<br/>";
            }
            document.querySelector("#status").innerHTML = s;
        } else {
            document.querySelector("#status").innerHTML = "<h2>No match</h2>";
        }   
    }   
}