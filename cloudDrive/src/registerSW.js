export function registerSW() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then(() => console.log("✅ Service Worker Registered"))
          .catch(err => console.log("SW registration failed:", err));
      });
    }
  }
  