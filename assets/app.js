// Initialize Firebase
var config = {
  apiKey: "AIzaSyBD7TCg1YOjfjuceZcPoMO9xhQBgFpyJuk",
  authDomain: "train-4349e.firebaseapp.com",
  databaseURL: "https://train-4349e.firebaseio.com",
  projectId: "train-4349e",
  storageBucket: "",
  messagingSenderId: "967617258883",
  appId: "1:967617258883:web:932464e7d225b0ab"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var dataRef = firebase.database();

  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    console.log(event);

    // Grabbed values from text boxes
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var tFrequency = $("#frequency").val().trim();
    var firstTime = "3:30";

    console.log(firstTime)

    
    // Code for handling the push
    dataRef.ref().push({
      name: name,
      destination: destination,
      tFrequency: tFrequency,
      firstTime: firstTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#first-train").val("");

  });

  dataRef.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());
  var firstTime = childSnapshot.val().firstTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = childSnapshot.val().tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // full list of items to the well
    $("#curr-trains").append("<tr> " +
      " <th scope='row'> " + childSnapshot.val().name + 
      " </th><td id='tbl_destination'> " + childSnapshot.val().destination +
      " </td><td id='tbl_frequency'> " + childSnapshot.val().tFrequency +
      " </td><td id='tbl_next-arrival'> " + moment(nextTrain).format("hh:mm") +
      " </td><td id='tbl_min-away'> " + tMinutesTillTrain +
      // " </td><td id='tbl_total_billed> " + childSnapshot.val().totalBilled +
      //" </td><td id='tbl_total_billed> " + childSnapshot.val().totalBilled +
      " </td></tr>");

    // Handle the errors
  })
