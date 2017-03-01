// Array containing homework objects
var homeworkArray = [];
// Array containing date objects
var dateArray = [];
// Current Date
var currentDate = new Date();
// Counter indicating current theme 0 = BLACK ON WHITE 1 = WHITE ON BLACK 2 = ORANGE ON GRAY
var currentTheme = 0;
// Global variable for converting/parsing object array
var jsonText;

// Load saved JSON data from WebStorage, then load display
function startup()
{
    if (localStorage.getItem("homework") == null)
    {
        document.getElementById("arrayOutput").innerHTML = "<p><br />No information saved on local machine</p>";
    }
    else
    {
        // Convert localStorage variable from JSON string to object
        jsonText = JSON.parse(localStorage.homework);
        homeworkArray = jsonText;
        // Populate dateArray with dates from saved objects
        for (var i = 0; i < homeworkArray.length; i++)
        {
            var dateToPush = homeworkArray[i].date;
            var hourToPush = homeworkArray[i].hour;
            createNewDate(dateToPush, hourToPush);
        }
        display();
    }
}

// Convert objects into JSON data, then save to WebStorage
function save()
{
    jsonText = JSON.stringify(homeworkArray);
    localStorage.homework = jsonText;
}

// Delete information stored in LocalStorage
function wipe()
{
    localStorage.removeItem("homework");
}

// Create new homework object and push to array, then call display
function createNewHomework()
{
    var newTitle = document.getElementById("titleField").value;
    var newDate = document.getElementById("dateField").value;
    var newDescription = document.getElementById("descriptionField").value;
    var newTime = document.getElementById("hourField").value;
    /*var newTime = "";
    if (document.getElementById("hourField").value != "")
    {
        newTime = document.getElementById("hourField").value;
    }*/
    var newHomework = new Homework(newTitle, newDate, newDescription, newTime);
    homeworkArray.push(newHomework);
    createNewDate(newDate, newTime);
    display();
}

function createNewDate(newDate, newTime)
{
    // Create date object from inputted date, push to dateArray
    var newDateDay = newDate.substring(0,2);
    var newDateMonth = newDate.substring(3, 5);
    var newDateYear = newDate.substring(6, 11);
    if (newTime != "")
    {
        var newDateHour = newTime.substring(0, 2);
        var newDateMinutes = newTime.substring(3, 5);
        var newDateSeconds = newTime.substring(6, 8);
        var newDateObject = new Date(newDateYear, newDateMonth - 1, newDateDay, newDateHour, newDateMinutes, newDateSeconds);
    }
    else
    {
        var newDateObject = new Date(newDateYear, newDateMonth - 1, newDateDay);
    }
    dateArray.push(newDateObject);
    
}

// Object constructor
function Homework(title, date, description, hour)
{
    this.title = title;
    this.date = date;
    this.description = description;
    this.hour = hour;
}

// Generates and displays object array in display div including title, date, description, and due date information
function display()
{
    document.getElementById("arrayOutput").innerHTML = "";
    homeworkArray.forEach(function(homework, i) {
        var titleOutput = "Title: " + homework.title + "<br />";
        var dateOutput = "Date: " + homework.date + " " + homework.hour + "<br />";
        var descriptionOutput = "Description: " + homework.description + "<br />";
        // Calculate the time difference and convert into days
        var timeDiff = Math.abs(dateArray[i].getTime() - currentDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var dueOutput = "Days left until due: " + String(diffDays);
        document.getElementById("arrayOutput").innerHTML += "<p><br /> <br />" + titleOutput + dateOutput + descriptionOutput + dueOutput + "<br /></p>";
        // This block of code is responsible for generating a "DELETE" button
        var button = document.createElement("button");
        var text = document.createTextNode("Delete");
        var path = document.getElementById("arrayOutput");
        button.id = "button" + i;
        button.appendChild(text);
        // Use path variable as shortcut to arrayOutput, append button
        path.appendChild(button);
        // TODO: Implement "EDIT" button here?
    });

    // This adds event listener to each button
    homeworkArray.forEach(function(homework, i)
    {
        // use JQuery to assign Bootstrap button class to each generated button
        $("#button" + String(i)).last().addClass("btn btn-primary btn-sm");
        // querySelector selects each button with it's ID and adds the event listener
        document.querySelector("#button" + i).addEventListener("click", function() {
            // Removes element from array
            // 27.02.17: Fixed bug, had to remove date object from array when removing corresponding homework object from array
            homeworkArray.splice(i, 1);
            dateArray.splice(i, 1);
            display();
        });
    });
    enforceTheme(currentTheme);
}
// TODO: EDIT FUNCTION