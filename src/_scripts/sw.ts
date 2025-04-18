let isRefreshing = false;

const refresh = () => {
  if (isRefreshing) return;

  isRefreshing = true;

  // Refresh the page
  window.location.reload();
};

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    const IS_INITIAL_LOAD = !navigator.serviceWorker.controller;

    try {
      const reg = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      if (IS_INITIAL_LOAD) {
        // If this is the initial load, we need to wait for the service worker to be ready
        navigator.serviceWorker.ready.then(() => {
          console.log('Service Worker is ready');
        });
      }
      // Listen for updates to the service worker
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // A new service worker is available, show a prompt to the user
              console.log('New version available. Refreshing...');
              refresh();
            }
          });
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
});
