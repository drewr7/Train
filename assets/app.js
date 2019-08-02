// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8_oeqODULT60elD4Aii618XDGWrqIVMQ",
    authDomain: "timesheet-app-18829.firebaseapp.com",
    databaseURL: "https://timesheet-app-18829.firebaseio.com",
     projectId: "timesheet-app-18829",
     storageBucket: "",
    messagingSenderId: "860258239492",
    appId: "1:860258239492:web:27182905d181a39e"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var dataRef = firebase.database();

  // Initial Values
  var name = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;
  var monthsWorked = 0;
  var totalBilled = 0;

  // Capture Button Click
  $("#add-emp").on("click", function(event) {
    event.preventDefault();
    console.log(event);

    // Grabbed values from text boxes
    name = $("#emp_name").val().trim();
    role = $("#role").val().trim();
    startDate = moment(
                        $("#startDate")
                        .val()
                        .trim(),
                        "YYYY-MM-DD"
                        ).format("X");
    monthlyRate = $("#rate").val().trim();
console.log($("#startDate").val());

    // Code for handling the push
    dataRef.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    console.log(childSnapshot.val().dateAdded);
   
    var monthsWorked = moment().diff(startDate, 'months')
    console.log (monthsWorked);
    var totalBilled


    // full list of items to the well
    $("#curr-emp").append("<tr> " +
      " <th scope='row'> " + childSnapshot.val().name + 
      " </th><td id='tbl_role'> " + childSnapshot.val().role +
      " </td><td id='tbl_startDate'> " + moment.unix(childSnapshot.val().startDate).format("MM/DD/YYYY") +
      " </td><td id='tbl_months-worked'> " + childSnapshot.val().monthsWorked +
      " </td><td id='tbl_monthly_rate'> " + childSnapshot.val().monthlyRate +
      " </td><td id='tbl_total_billed> " + childSnapshot.val().totalBilled +
      //" </td><td id='tbl_total_billed> " + childSnapshot.val().totalBilled +
      " </td></tr>");

    // Handle the errors
  })