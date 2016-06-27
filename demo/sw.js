var version = 'v1::';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(version + 'responsive-navbar')
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/responsive-navbar.css',
          '/responsive-navbar.js',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://fonts.googleapis.com/css?family=Lato',
          'https://fonts.gstatic.com/s/materialicons/v17/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2',
          'https://fonts.gstatic.com/s/lato/v11/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('service worker ready!');
});

self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // console.log(event.request.url);

    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  }
});
