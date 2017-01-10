(function(){
  window.Mario = {}

  var readyBound = false;
  var isReady = false;
  var readyList = [];

  // Handle when the DOM is ready
  function domReady() {
    // Make sure that the DOM is not already loaded
    if(!isReady) {
      // Remember that the DOM is ready
      isReady = true;

      if(readyList) {
        for(var fn = 0; fn < readyList.length; fn++) {
          readyList[fn].call(window, []);
        }

        readyList = [];
      }
    }
  };

  // From Simon Willison. A safe way to fire onload w/o screwing up everyone else.
  function addLoadEvent(func) {
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      var old = window.onload;
      window.onload = function() {
        if (oldonload) {
          old();
        }
        func();
      }
    }
  };

  // does the heavy work of working through the browsers idiosyncracies (let's call them that) to hook onload.
  function bindReady() {
    if(readyBound) {
      return;
    }

    readyBound = true;

    // Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
    if (document.addEventListener) {
      // Use the handy event callback
      document.addEventListener("DOMContentLoaded", domReady, false);

    } else if ( document.attachEvent ) {
      // ensure firing before onload,
      // maybe late but safe also for iframes
      document.attachEvent("onreadystatechange", function(){
        if ( document.readyState === "complete" ) {
          document.detachEvent( "onreadystatechange", arguments.callee );
          domReady();
        }
      });

      // If IE and not an iframe
      // continually check to see if the document is ready
      if ( document.documentElement.doScroll && window == window.top ) (function(){
        if ( isReady ) return;

        try {
          // If IE is used, use the trick by Diego Perini
          // http://javascript.nwbox.com/IEContentLoaded/
          document.documentElement.doScroll("left");
        } catch( error ) {
          setTimeout( arguments.callee, 0 );
          return;
        }

        // and execute any waiting functions
        domReady();
      })();
    } else {
      // A fallback to window.onload, that will always work
      addLoadEvent(domReady);
    }
  };

  // This is the public function that people can use to hook up ready.
  Mario.run = function(fn, args) {


    // If the DOM is already ready
    if (isReady) {
      // Execute the function immediately
      Mario.Controller.init.apply(Mario.Controller);
    } else {
      // Attach the listeners
      bindReady();
      // Add the function to the wait list
      readyList.push( function() { return Mario.Controller.init.apply(Mario.Controller); } );
    }
  };

  bindReady();

})();

Mario.run();
