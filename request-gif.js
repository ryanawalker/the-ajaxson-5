
$(document).ready(function() {

    $("#form-gif-request").submit(function(evt) {

        // This line prevents the form submission from doing what it normally does:
        // send a request (which would cause our page to refresh).
        // Because we will be making our own AJAX request,
        // we dont need to send a normal request
        // and we definitely don't want the page to refresh.
        event.preventDefault();

        // check if the user's CAPTCHA attempt is correct
        if ($("input[name='captcha']").val() == "5") {
            // fetch and display the GIF
            fetchAndDisplayGif();
            // hide the red "No Gifs" error message
            toggleCaptchaError(false);
        }
        else {
            // show the red "No Gifs" error message
            toggleCaptchaError(true);
        }
    });
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // get the user's input text from the DOM
    var searchQuery = $("#form-gif-request").find("[name='tag']").val(); // DONE should be e.g. "dance"
    console.log(searchQuery);

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : "jackson 5" + searchQuery // DONE should be e.g. "jackson 5 dance"
    };

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // DONE where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);

            // DONE
            // 1. set the source attribute of our image to the image_url of the GIF
            $("#gif").attr("src", response.data.image_url);
            // 2. hide the feedback message and display the image
            setGifLoadedStatus(true);
        },
        error: function(err) {
            // if something went wrong, the code in here will execute instead of the success function
            console.log("we got an error:");
            console.log(err);

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // DONE
    // give the user a "Loading..." message while they wait
    $("#feedback").text("Loading...");
    setGifLoadedStatus(false);
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}


function toggleCaptchaError(isError) {
    $("#captcha-container").toggleClass("has-error", isError);
    $("#error-msg").attr("hidden", !isError);
}
