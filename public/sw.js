
const CACHE_NAME = 'resbit-cache-v1';
const AUDIO_CACHE = 'resbit-audio-v1';

const audioAssets = [
  '/audio/music/peaceful.mp3',
  '/audio/music/nature.mp3',
  '/audio/music/piano.mp3',
  '/audio/music/waves.mp3',
  '/audio/transitions/bell.mp3',
  '/audio/transitions/chime.mp3',
  '/audio/transitions/bowl.mp3',
  '/audio/ambient/rain.mp3',
  '/audio/ambient/forest.mp3',
  '/audio/ambient/stream.mp3',
  '/audio/ambient/white-noise.mp3'
];

const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  ...audioAssets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)),
      caches.open(AUDIO_CACHE).then((cache) => cache.addAll(audioAssets))
    ])
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== AUDIO_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
});
