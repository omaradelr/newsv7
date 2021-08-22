
      // --------------- Adv --------------- //
      $('.widget-content').each(function () {
        var text = $(this).text();
        var srcimg= text.split('|');
        var linkimg='<img src="'+srcimg[1]+'"  />'        
        if (text.match('adv')) {
          text = srcimg[0].replace('adv/', '');
          $(this).html('<a class="mog-adv" href=' + text + '>'+linkimg+'</a>');
        }
      });  

      $(function() {
        $('#LinkList1 .widget-content ul').clone().appendTo('.ct-author-bio');
      });		

      // --------------- Resize Thumbnail --------------- //
      $(function() {
        $('.Profile a').find('img').attr('src', function(i, src) {return src.replace( 's15', 's350' );});
        $('.item-thumbnail a').find('img').attr('src', function(i, src) {return src.replace( 'w72-h72', 'w150-h100' );});
        $('.author-profile').find('img').attr('src', function(i, src) {return src.replace( 's15', 's350' );});	
        $('.author-profile').find('img').attr('src', function(i, src) {return src.replace( 's20', 's350' );});	
        $('.author-profile').find('img').attr('src', function(i, src) {return src.replace( 's85', 's350' );});	
        $('.avatar-image-container').find('img').attr('src', function(i, src) {return src.replace( 's20', 's110' );});	
        $('.avatar-image-container').find('img').attr('src', function(i, src) {return src.replace( 's35', 's110' );});	
        $('.avatar-image-container').find('img').attr('src', function(i, src) {return src.replace( 's35-c', 's110-c' );});			
      });      

      // --------------- Top Top --------------- //
      $(function () {
        $(window).scroll(function () {
          if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
          } else {
            $('.scrollup').fadeOut();
          }
        });

        $('.scrollup').click(function () {
          $("html, body").animate({
            scrollTop: 0
          }, 600);
          return false;
        });
      });      
