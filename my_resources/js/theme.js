// These functions change the color scheme, then update the currentTheme counter to keep track of the current theme
function changeToWhite()
{
    $("p").css({"color": "black"});
    $("h1").css({"color": "black"});
    $("h3").css({"color": "black"});
    document.body.style.backgroundColor = "white";
    currentTheme = 0;
}

function changeToBlack()
{
    $("p").css({"color": "white"});
    $("h1").css({"color": "white"});
    $("h3").css({"color": "white"});
    document.body.style.backgroundColor = "black";
    currentTheme = 1;
}

function changeToGray()
{
    $("p").css({"color": "darkorange"});
    $("h1").css({"color": "darkorange"});
    $("h3").css({"color": "darkorange"});
    document.body.style.backgroundColor = "darkslategrey";
    currentTheme = 2;
}

// These function ensures the color scheme is kept while the display is updated
function enforceTheme(currentTheme)
{
    switch(currentTheme)
    {
        case 0:
            changeToWhite();
            break;
        case 1:
            changeToBlack();
            break;
        case 2:
            changeToGray();
            break;
    }
}