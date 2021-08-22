      function blockfeeds(parent, count, label, style) {

        // Image Optimizations
        function opImages(img, size, w, h) {
          return img.replace(size, 'w' + w + '-h' + h)
        }

        // No Thumb & Months Name
        var furl       = "",
            startIndex = Math.floor( (Math.random() * count ) + 1 ),
            noThumb    = "https://goo.gl/zLjzNq",
            monthsName = [ "", januaryMsg, februaryMsg, marsMsg, aprilMsg, mayMsg, juneMsg, julyMsg, augustMsg, septemberMsg, octoberMsg, novemberMsg, decemberMsg ];

        // JSON FEED URL by Sort
        if (label !== undefined) {
          if (label.match('recent')) {
            furl = 'https://yujgnjghjghmghmgh.blogspot.com/feeds/posts/summary?alt=json-in-script&max-results=' + count;
          } else if (label.match('random')) {
            furl = 'https://yujgnjghjghmghmgh.blogspot.com/feeds/posts/summary?alt=json-in-script&orderby=updated&start-index=' + startIndex + '&max-results=' + count;
          } else if ( !(label.match('recent')) || !(label.match('random')) ) {
            furl = 'https://yujgnjghjghmghmgh.blogspot.com/feeds/posts/summary/-/' + label + '?alt=json-in-script&max-results=' + count;
          }
        } // JSON FEED URL Close


        // AJAX Function
        if (furl.length > 0) {
          $.ajax({
            type: 'GET',
            url: furl,
            cache: true,
            dataType: 'jsonp',
            beforeSend: function(){
              parent.html('Loading Posts...');
            },
            success: function(data){

              var htmlcode = '',
                  feedcode = '',
                  link     = '',
                  json     = data.feed.entry;


              // HTML Start Code =========================================================

              /* Containers */
              var conD = "<div class='container-ct'>";

              switch(style) {
				case 'hottrend':
                case 'cate1':
				case 'cate2':
				case 'cate4':
				case 'cate5':
                  htmlcode += '<div class="layout-item">' + conD + '<div class="grp-post-entry">';
                  break;
				case 'featured':
                case 'cate3':
				case 'cate6':
                  htmlcode += '<div class="layout-item-1">' + conD + '<div class="grp-post-entry uk-position-relative uk-visible-toggle uk-light"  data-uk-slider="autoplay: true; autoplay-interval: 5000">';
                  break;
                case 'related-posts'ed
                  
                  
                  htmlcode += '<ul>';
                  break;
                default:
                  break;
              }

              // The Overall Loop for Entries
              for (var i=0; i<json.length; i++) {

                // Get Link data ===========================================================
                for (var j=0; j<json[i].link.length; j++) {
                  if(json[i].link[j].rel == "alternate") {
                    link = json[i].link[j].href;
                    break;
                  }
                }

                // Get Category data =======================================================
                if ('category' in json[i]) {
                  if (json[i].category[0].term !== undefined) {
                    var getCategory = json[i].category[0].term;
                  } else {
                    var getCategory = 'Uncategorized';
                  }
                }

                // Get Time date data ======================================================
                var getDate = json[i].published.$t,
                    y       = getDate.substring(0, 4),
                    m       = getDate.substring(5, 7),
                    d       = getDate.substring(8, 10),
                    date    = monthsName[parseInt(m, 10)] + ' ' + d + ', ' + y ;


                // Get other data ==========================================================
                var getTitle     = json[i].title.$t,
                    getId        = json[i].id.$t,
                    getAuthor    = json[i].author[0].name.$t,
					getAuthorImg = json[i].author[0].gd$image.src,
                    getAuthorUrl = json[i].author[0].uri.$t,
                    getAuthorImg = json[i].author[0].gd$image.src,
                    getComments  = json[i].thr$total.$t,
                    getSummary   = json[i].summary.$t,
                    shortSummary = getSummary.substr(0, 150) + '...',
                    postThumb    = json[i].media$thumbnail.url;


                // Comments Strings ========================================================
                if(getComments == 0) {

                  var postComments = noCommentsMsg;

                } else if (getComments == 1) {

                  var postComments = '1' + ' ' + commentMsg;

                } else {

                  var postComments = getComments + ' ' + commentsMsg;

                }


                // Thumbnail Optimization ==================================================
                if(postThumb !== undefined) {

                  // If Youtube
                  if(postThumb.match('default.jpg')) {
                    var $postThumb = postThumb.replace( "/default.jpg", "/hqdefault.jpg");
                  }

                  // If Something Else
                  switch(style) {
					case 'featured':
                      if(postThumb.match('s72')) {
                        var $postThumb = opImages(postThumb, 's72', 1920, 650);
                      }
                      break;
					case 'hottrend':
                    case 'cate1':
					case 'cate2':
					case 'cate3':
					case 'cate4':
					case 'cate5':
                    case 'related-posts':
                      if(postThumb.match('s72')) {
                        var $postThumb = opImages(postThumb, 's72', 420, 320);
                      }
                      break;                    
                    default:
                      if(postThumb.match('s72')) {
                        var $postThumb = opImages(postThumb, 's72', 200, 200);
                      }
                      break;
                  }

                  var $src = '<img src="' + $postThumb + '" alt="' + getTitle + '" />';

                } else {

                  var $src = '<img src="' + noThumb + '" alt="' + getTitle + '" />';

                }

                // Helpers Variable ========================================================

                var postId 	 = getId.match(/post-\w*/),
                    title    = '<h3 class="title-post"><a href="' + link + '" rel="bookmark">' + getTitle + '</a></h3>',
                    category = '<a class="label-post" href="/search/label/' + getCategory + '?max-results=12" rel="category tag">' + getCategory + '</a>',
                    comments = '<div class="post-comments"><i class="fa fa-comments-o" aria-hidden="true"></i><a href="' + link + '#comments">' + postComments + '</a></div>',
                    author   = '<div class="post-author vcard"><i aria-hidden="true" class="fa fa-user-circle-o"></i><span class="name-author"><a href="' + getAuthorUrl + '" rel="author" title="' + byMsg + ' ' + getAuthor + '">' + getAuthor + '</a></span></div>',
					avtauthor = '<div class="post-author-img"><a href="' + getAuthorUrl + '"><img src="' + getAuthorImg + '" alt="' + getAuthor + '"/></a></div>',
                    time     = '<div class="grp-post"><span class="date-post"><i class="fa fa-clock-o" aria-hidden="true"></i><time datetime="' + getDate + '">' + date + '</time></span></div>',
                    meta     = '<div class="post-meta"><div class="post-meta-inner">' + author + '' + category + '' + time + '' + comments + '</div></div>',
                    shortMeta     = '<div class="post-meta"><div class="post-meta-inner">' + time + '' + comments + '</div></div>',
                    postMore = '<div class="post-more"><a href="' + link + '">' + readMoreMsg + '</a></div>',
					postSummary	= '<div class="sample-post">' + shortSummary + '</div>';   

                // HTML Code for Loop ======================================================

                switch(style) {
                  case 'featured':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-12"><ul class="uk-slider-items uk-child-width-1-1"><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '<div class="grp-post"><span>' + author + '</span><span>' + time + '</span><span>' + comments + '</span></div></div></div></li>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '<div class="grp-post"><span>' + author + '</span><span>' + time + '</span><span>' + comments + '</span></div></div></div></li>';
                    }
                    break;
                  case 'hottrend':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-9"><ul>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>';
                    }
                    break;
                  case 'cate1':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-1"><ul><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '' + postSummary + '</div></div></li></ul></div><div class="post-entry post-entry-2"><ul>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post"><div class="ct-panel-post">' + title + '' + time + '</div></div></li>';
                    }
                    break;
                  case 'cate2':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-3"><ul><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>';
                    } else if ( i === 1 ) {
						htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li></ul></div><div class="post-entry post-entry-4"><ul>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post"><div class="ct-panel-post">' + title + '' + time + '</div></div></li>';
                    }
                    break;
                  case 'cate3':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-5"><ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m"><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>';
                    }
                    break;
                  case 'cate4':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-1"><ul><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '' + postSummary + '</div></div></li></ul></div><div class="post-entry post-entry-6"><ul>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post"><div class="ct-panel-post">' + title + '' + time + '</div></div></li>';
                    }
                    break;
                  case 'cate5':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-3"><ul><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>';
                    } else if ( i === 1 ) {
						htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li></ul></div><div class="post-entry post-entry-7"><ul>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post"><div class="ct-panel-post">' + title + '' + time + '</div></div></li>';
                    }
                    break;
                  case 'cate6':
                    if ( i === 0 ) {
                      htmlcode += '<div class="post-entry post-entry-8"><ul class="uk-slider-items uk-child-width-1-1"><li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>';
                    } else {
                      htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post fix-panel-post"><div class="ct-panel-post">' + category + '' + title + '' + time + '</div></div></li>'
                    }
                    break;
                  case 'related-posts':
                    htmlcode += '<li><a class="thumb-post ' + postId + '" href="' + link + '" style="background-image:url(' + $postThumb + ')" data-post-id="' + postId + '"></a><div class="panel-post">' + category + '' + title + '' + time + '</div></li>';
                    break;
                  default:
                    htmlcode += '<p>This is a default!</p>';
                    break;
                }


              }// Overall Loop Close for Entries


              // HTML Code for End Elements ======================================================

              var nextNav = '<a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>',
                  prevNav = '<a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>';

              switch(style) {				
                case 'featured':	
                case 'cate3':
				case 'cate6':
                  htmlcode += '</div>' + prevNav + '' + nextNav + '</div>';
                  break;
                default:
                  break;
              }

              // Print as HTML
              parent.html(htmlcode);


            }, // Success Function Close

            error: function(){

              parent.html("<div class='uk-alert-danger' data-uk-alert=''><p>Error loading feeds! Check if your blog is public, contains at least a label in all articles and that you've allow your blog feed as full! if the problem still please do not hesitate to contact us.</p></div>");

            } // Error Function Close

          }); // Ajax Function Close

          return false;

        } // If URL Close

      } // BlockFeeds Function Close

      // Get Global Shortcode
      $('.widget-content').each(function() {

        var $this = $(this),
            sp = $this.text().split("/");

        if(!isNaN(sp[0])) {
          var count = sp[0],
              style = sp[1],
              label = sp[2];
          blockfeeds($this, count, label, style);
        }

      });

      // Get Related Posts Shortcode
      $('.related-main .related-posts').each(function() {

        var $this = $(this),
            count = 3,
            style = 'related-posts',
            label = $this.text();

        blockfeeds($this, count, label, style);

      });	

      // Cate title 
      $('.mog-category h2.title').each(function() {
        var $this = $(this),
            label = $this.text();

        blockfeeds($this, label);

        $(this).html('<a href="/search/label/' + label + '?max-results=12" rel="category tag">'+ label +'</a>');
      });	

      // Summary Grid Posts 
        $('.sample-post').each(function() {
          var re = /<\S[^>]*>/g;
          var postcontent = $(this).find('.ct-sample-post').html().replace(re,"");
          if(postcontent.length > 150){
            postcontent = ''+postcontent.substring(0,150)+'...';
          }
          $(this).html(''+ postcontent +'');
        });
