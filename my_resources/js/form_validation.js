// Check that required forms are filled. throw alert if not filled.
function formValidation()
{
    var checkTitleField = document.getElementById("titleField").value;
    var checkDescriptionField = document.getElementById("descriptionField").value;
    var checkDateField = document.getElementById("dateField").value;
    var checkHourField = document.getElementById("hourField").value;

    if (checkTitleField == "" || checkDescriptionField == "" || checkDateField == "" )
    {
        alert("All mandatory fields must be filled");
    }
    else if (!isGoodDate(checkDateField))
    {
        alert("You must input date as DD/MM/YYYY");
    }
    else if (checkHourField != "" && !isGoodHour(checkHourField))
    {
        alert("You must input hour as HH:MM:SS");
    }
    else
    {
        createNewHomework();
    }
    
}

function isGoodDate(date)
{
    // Regular expression used for date validation taken from a post at this link:
    // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
    var reGoodDate = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    return reGoodDate.test(date);
}



function isGoodHour(hour)
{
    // Regular expression used for hour validation taken from a post at this link:
    // https://stackoverflow.com/questions/14892740/regular-expression-for-hhmmss
    var reGoodHour = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
    return reGoodHour.test(hour);
}