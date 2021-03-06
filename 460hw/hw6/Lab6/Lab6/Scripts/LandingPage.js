﻿$(document).ready(function () {
    /*
        Swapping function for the banner buttons.
    */
    $(".banner-nav-link").on('click', function () {
        
        swapDivVisibility(this, "#banner-drop-downs");
  
    });
    /*
        Swapping function for the sub banner buttons.
    */
    $(".product-categories-link").on("click", function () {
        swapDivVisibility(this, "#product-categories-container");
    });
    /*
    This function will create an HTTP Post request to the home/index controller.
    It will process which of the subCategory buttons that a user has selected and
    pass the subCategory Name off to the controller.
    */
    $(".subCategoryButton").on("click", function () {
        //This will get the label of the specific element and set it to 
        //the name of the button for controller/POST processing.
        var buttonName = $(this).text();

        $.ajax({
            type: 'POST',
            url: "/Home/ProductsList",
            data: { subCategoryButton: buttonName },
            dataType: "html",
            success: function (response) {
                
                /*Ok so ajax does not show a call to the view if that is the result of 
                your specified POST action. It will come back to the callback function
                on success or failer. This is the way around this. Have the POST action
                return the view with the model included, then on success switch the url
                and window location, THEN populate the div with the response (which is the
                view html information that INCULDES the view! There. Remember that.*/
                window.location.href = "/Home/ProductsList";
                $('#container').html(response);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
           console.log(jqXHR);
           console.log(textStatus);
           console.log(errorThrown);
        });
    });

    function swapDivVisibility(button, divContainer)
    {
        /*
            This will get get the drop down menus which are equal to the index of
            the button pressed. ie. mens-drop-down is in index 0 of the ul. This will get
            the div which is in the 0 index position of the banner-drop-downs container.
        */
        var $dropDown = $(divContainer).children().eq($(button).parent().index());

        //Toggle that divs visibility
        $dropDown.toggle();
        //Hide the rest.
        $dropDown.siblings().hide();
    }

});