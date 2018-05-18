// register the service worker if available
 if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").then(function(reg) {
        console.log("register", reg);
      }).catch(function(err) {
        console.log("err", err);
      });
    }

 window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired

      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {

        console.log(choiceResult.outcome);

        if (choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        } else {
          console.log('User added to home screen');
        }
      });
    });
