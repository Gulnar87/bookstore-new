



// 


// $(function () { 

//   $(".read-more").blur(function (event) {
//       $("#multiCollapseExample1, #multiCollapseExample2, #multiCollapseExample3" ).collapse('hide');
//   });

//   // $(".read-more").click(function (event) {
//   //   $(event.target).focus();
//   // });
// });

// (function (global){

// })(window); 


// $(function () { 
//   $("#worksButton").blur(function (event) {
//       $("#multiCollapseExample4" ).collapse('hide');
//   });

// });

// (function (global){

// })(window); 


$(document).ready(function(){
 $('#search').on("click",(function(e){
  $(".form-inline").addClass("sb-search-open");
    e.stopPropagation() 
  }));
   $(document).on("click", function(e) {
    if ($(e.target).is("#search") === false && $(".form-control").val().length == 0) {
      $(".form-inline").removeClass("sb-search-open");
    } 
  });
    $(".form-control-submit").click(function(e){
      $(".form-control").each(function(){
        if($(".form-control").val().length == 0){
          e.preventDefault();
          $(this).css('border', '1px solid grey');
        }
    }) 
  }) 
})


$(document).ready(function() {

  var toggleAffix = function(affixElement, scrollElement, wrapper) {
  
    var height = affixElement.outerHeight(),
        top = wrapper.offset().top;
    
    if (scrollElement.scrollTop() >= top){
        wrapper.height(height);
        affixElement.addClass("affix");
    }
    else {
        affixElement.removeClass("affix");
        wrapper.height('auto');
    }
  };
  

  $('[data-toggle="affix"]').each(function() {
    var ele = $(this),
        wrapper = $('<div></div>');
    
    ele.before(wrapper);
    $(window).on('scroll resize', function() {
        toggleAffix(ele, $(this), wrapper);
    });
    
    // init
    toggleAffix(ele, $(window), wrapper);
  });
  
});




  

 


 





