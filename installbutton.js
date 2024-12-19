let deferredPrompt;
const installButton = document.getElementById("installButton");
let dataDisplay = document.getElementById("dataDisplay");

window.addEventListener("beforeinstallprompt", (e) => {
   e.preventDefault();
   deferredPrompt = e;
   installButton.hidden = false;

   installButton.addEventListener("click", () => {
      installButton.hidden = true;
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
         if (choiceResult.outcome === "accepted") {
            window.addEventListener("appinstalled", () => {
               swal(
                  "Installed succesfully!",
                  "ExcRate by Carl Aviso",
                  "success"
               );
            });
         } else {
            swal("Installation cancelled", "", "error");
         }
         deferredPrompt = null;
      });
   });
});
