let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (e) => {
   e.preventDefault();
   deferredPrompt = e;
   installButton.hidden = false;

   installButton.addEventListener("click", () => {
      installButton.hidden = true;
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
         if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
         } else {
            console.log("User dismissed the install prompt");
         }
         deferredPrompt = null;
      });
   });
});

window.addEventListener("appinstalled", () => {
   console.log("PWA was installed");
});
