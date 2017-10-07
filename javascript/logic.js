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
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
});

var a;

database.ref().on("child_added", function(childSnapshot) {

    var firstTrainInput = moment(childSnapshot.val().firstTrain, "hh:mm");
    var frequencyInput = childSnapshot.val().frequency;
    var differenceTime = moment().diff(moment(firstTrain), "minutes");
    var minutesAway = frequencyInput - (differenceTime % frequencyInput);
    var trainTimes = moment().add(minutesAway, "minutes");
    var nextArrival = moment(trainTimes).format("hh:mm");

    var trainName = childSnapshot.val().train;
    var destinationName = childSnapshot.val().destination


    

    a = $("<tr>")
    var b = $("<td>").html(trainName);
    var c = $("<td>").html(destinationName);
    var d = $("<td>").html(frequencyInput);
    var e = $("<td>").html(minutesAway);
    var f = $("<td>").html(nextArrival);
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