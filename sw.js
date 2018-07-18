
var CACHE_VERSION=1;

var CURRENT_CACHES = {
  font: 'map-static-v' + CACHE_VERSION
};
 var expectedCacheNames = Object.values(CURRENT_CACHES);

self.addEventListener('install',function(event){
event.waitUntil(
	caches.open(CURRENT_CACHES['font']).then(function(cache) {
		// body...
		return cache.addAll([
  '/',
  '/index.html',
  './src/App.js',
  './src/App.css',
  './src/index.js',
  './src/index.css',
  './src/initMap.js',
  './src/MyLocation.json'
  


   ]);
  })
 );
});

self.addEventListener('activate',function(event){
event.waitUntil(

	caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!expectedCacheNames.includes(cacheName)) {
            console.log('Deleting out of date cache:', cacheName);
            
            return caches.delete(cacheName);
          }
        })
      );
    })
   );
})

self.addEventListener('fetch', function(event) {
  event.respondWith(

    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache:', response);

          return response;
        }

       // console.log('Fetching request from the network');

        return fetch(event.request).then(function(networkResponse) {
         cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });
      }).catch(function(error) {
        
        // Handles exceptions
        console.error('Error in fetch handler:', error);

        throw error;
      });
    })
  );
});