      // --------------- Load Page --------------- //
      $( function() {
        setTimeout( function() {
          $( "#loader" ).css( "display", "none" );
        }, 2000 );
      }); 		

      // --------------- Add Class --------------- //
      $('#LinkList3,#LinkList4').addClass('social-network');

      // --------------- Social Network --------------- //
      $(".social-network ul li a").each(function(){var a=$(this).text();"facebook"==a&&$(this).html('<i class="fa fa-facebook" aria-hidden="true"></i>'),"twitter"==a&&$(this).html('<i class="fa fa-twitter" aria-hidden="true"></i>'),"google"==a&&$(this).html('<i class="fa fa-google-plus" aria-hidden="true"></i>'),"linkedin"==a&&$(this).html('<i class="fa fa-linkedin" aria-hidden="true"></i>'),"youtube"==a&&$(this).html('<i class="fa fa-youtube-play" aria-hidden="true"></i>'),"instagram"==a&&$(this).html('<i class="fa fa-instagram" aria-hidden="true"></i>'),"pinterest"==a&&$(this).html('<i class="fa fa-pinterest" aria-hidden="true"></i>'),"rss"==a&&$(this).html('<i class="fa fa-rss" aria-hidden="true"></i>')});     	

      // --------------- Primary Navigation  --------------- //
      var navLevel = -1,
          navContainer = "",
          navMenu = "";
      $("#main-menu #LinkList2").find("ul").find("li").each(function () {
        for (var navText = $(this).text(), navLink = $(this).find("a").attr("href"), i =
             0, l = 0; l < navText.length && (i = navText.indexOf("_", i), -1 != i); l++)
          i++;
        if (level = l, level > navLevel && (navContainer += "<ul>", navMenu += "<ul>"), level < navLevel) {
          offset = navLevel - level;
          for (var l = 0; l < offset; l++) navContainer += "</ul></li>", navMenu += "</ul></li>";
        }
        navText = navText.replace(/_/gi, ""), navContainer += "<li><a href='" + navLink + "'>" + navText + "</a>", navMenu += "<li><a href='" + navLink + "'>";
        for (var l = 0; l < level; l++) navMenu += "";
        navMenu += navText + "</a>", navLevel = level
      });
      for (var i = 0; navLevel >= i; i++) navContainer += "</ul>", navMenu += "</ul>", 0 != i && (navContainer += "</li>", navMenu += "</li>");
      $("#main-menu").html("<nav class='nav-header'>" + navMenu + "</div>"), $("#main-menu ul li ul").parent("li").addClass("uk-parent").append('<span class="icon-parent" uk-icon="icon: chevron-down; ratio: 0.6"></span>');    

      // --------------- Js Click --------------- //
      $(function() {  
        $('.open-search').click(function () {
          $('.form-search').addClass("show-search");
        });
        $('.close-search').click(function() {
          $('.form-search').removeClass("show-search");
        });
      }); 
