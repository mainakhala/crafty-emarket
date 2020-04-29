var stickingPosition = 0;
var slIndex = 0;

$(document).ready(function() {
    stickingPosition = $("header nav").offset().top;

    //accordion
    $("#Accordion").accordion({
    animate: 500,
    active: 0,
    collapsible: true,
    event: "click",
    heightStyle: "content",
    icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus",}
    });


    //select menu functions
    $("#selectItem").selectmenu({
        width: 200,
        icons: { button: "ui-icon-circle-triangle-s" }
    });

    $("#selectItem").on( "selectmenuchange", function() {
            var name = document.getElementById("productName");
            var price = document.getElementById("productPrice");
            name.innerHTML = $(this).find("option:selected").text();
            price.innerHTML = $(this).val();
        });

        //shipping address slide up
        $("#shipAdd").click(function(){
			if ( $(this).prop("checked") ){
				$("#bAdd").slideUp("fast");
			}else{
				$("#bAdd").slideDown("fast");

			}
        });
        

        //validation
        $("#cartform").validate({
            rules:{
                name : "required",
                email : {
                    required : true,
                    email: true, 
                        },
        
                phone: "required",
                phoneUS: true,
            }, 
            messages :{
                name :{
                    required : "Full name is required"
                    },
                email: {
                    required: "Email Address is required",
                    email: "Email address has to be valid e.g., example@example.com"
                    },
                phone:{
                    required: "Phone number is required",
                    phoneUS: "Phone number has to be  in the following format (xxx) xxx- xxxx"
                    }   
            },
            
            errorPlacement : function (error, element) { 
                if ( element.is (":radio") || element.is(":checkbox") ){
                    error.appendTo(element.parent ());
                }else{
                    error.insertAfter(element);
                }
             }
        });

        
        $("#addCart").on("click", function() {
            var $button = $(this);
            $button.text("Item Added");

            window.setTimeout(function() {
                $button.text("Add to Cart");
            }, 1000);
        });
});
// end ready function


//Sticky Nav
$(window).on("scroll", function() {
    if ($(window).scrollTop() >= stickingPosition) {
        if (!$("header nav").hasClass("sticky")) {
            $("header").css("padding-bottom", $("header nav").outerHeight());
            $("header nav").addClass("sticky");
        }
    } else if ($("header nav").hasClass("sticky")) {
        $("header").removeAttr("style");
        $("header nav").removeClass("sticky");
    }
});

showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("Slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slIndex++;
    if (slIndex > slides.length) {slIndex = 1}    
    slides[slIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000); 
}
 
//Click next or previous buttons
function nextSlides(n){
    showSlides_onClick(slIndex += n);
    }   
    
    function showSlides_onClick(n) {
        var i;
        var slides = document.getElementsByClassName("Slides");
        if (n > slides.length) {slIndex = 1} 
        if (n < 1) {slIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        slides[slIndex-1].style.display = "block";
      }

