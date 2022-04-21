var slideshow = function(tag) {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
        "tags=" + tag + "&format=json&jsoncallback=?";
    var showImage = function(imageIndex) {
        if (tag !== "") {
            $.getJSON(url, function(flickrResponse) {
                var $img = $("<img>").attr("src", flickrResponse.items[imageIndex].media.m).hide();
                $("main .photos").empty();
                $("main .photos").append($img);
                $img.fadeIn();
                setTimeout(function() {
                    imageIndex = imageIndex + 1;
                    showImage(imageIndex);
                }, 3000);
                if (imageIndex === 5) {
                    imageIndex = -1;
                }
            });
        }
    };
    showImage(0);
}

var main = function() {
    "use strict";
    var $inputLabel = $("<p>").text("Введите тег: "),
        $input = $("<input>").addClass("tag"),
        $button = $("<button>").text("Поиск");
    $button.on("click", function() {
        var tag = "";
        tag = $input.val();
        $input.val("");
        if (tag !== "") {
            $("main .photos").empty();
            slideshow(tag);
        }
    });
    $("main .content").append($inputLabel).append($input).append($button);
};
$(document).ready(main);