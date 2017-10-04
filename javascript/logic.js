var config = {
    // Initialize Firebase
    apiKey: "AIzaSyDFgtPoUh_pQeRnjAvR0JUoSE-02Rg3ejU",
    authDomain: "woot-a346a.firebaseapp.com",
    databaseURL: "https://woot-a346a.firebaseio.com",
    projectId: "woot-a346a",
    storageBucket: "woot-a346a.appspot.com",
    messagingSenderId: "438191289470"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var departing = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

$("#addTrain").on("click", function() {

    train = $("#trainInput").val().trim();
    departing = $("#departInput").val().trim();
    destination = $("#destInput").val().trim();
    firstTrain = $("#firstInput").val().trim();
    frequency = $("#freqInput").val().trim();

    console.log("Train:" + train);
    console.log("Departing From:" + departing);
    console.log("destination:" + destination);
    console.log("First Train:" + firstTrain);
    console.log("Frequency" + frequency);


    database.ref().push({
        train: train,
        departing: departing,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
var a;

// var randomFormat = "MM/DD/YYYY";

// var convertedDate = moment(startDate, randomFormat);

// var correctDate = moment.unix(startDate).format("MM/DD/YYYY");

// var f = $("<td>").html(correctDate);

// $("#info").append(a)

database.ref().on("child_added", function(childSnapshot) {
    
    a = $("<tr>")
    var b = $("<td>").html(childSnapshot.val().train);
    var c = $("<td>").html(childSnapshot.val().departing);
    var d = $("<td>").html(childSnapshot.val().destination);
    var e = $("<td>").html(childSnapshot.val().firstTrain);
    var f = $("<td>").html(childSnapshot.val().frequency);
    a.append(b);
    a.append(c);
    a.append(d);
    a.append(e);
    a.append(f);
    $("#info").append(a)

});
// // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
// //     $("#nameDisplay").html("Name" + snapshot.val().name);
// //     $("#roleDisplay").html("Role" + snapshot.val().role);
// //     $("#startDisplay").html("Start Date" + snapshot.val().startDate);
// //     $("#rateDisplay").html("Rate" + snapshot.val().rate);
// // });