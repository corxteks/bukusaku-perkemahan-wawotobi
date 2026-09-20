const CACHE_NAME = "buku-saku-kwaran-v8";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.webmanifest",
  "./favicon.ico",
  "./favicon-32.png",
  "./apple-touch-icon.png",
  "./logo-perkemahan-gabungan.jpeg",
  "./latar-pramuka-kemah.webp",
  "./banner-kegiatan.webp",
  "./maskot-pramuka-cutout.webp",
  "./qrcode-booklet-perkemahan.png"
  ,"./maskot-anoa-anim.webp"
  ,"./maskot-anoa-chromakey.webm"
  ,"./maskot-anoa-clean.gif"
  ,"./maskot-anoa-final.png"
  ,"./narasi/sampul.mp3","./narasi/tema.mp3","./narasi/foto.mp3","./narasi/kepanitiaan.mp3","./narasi/bekal.mp3","./narasi/hari3.mp3","./narasi/hari0.mp3","./narasi/hari1.mp3","./narasi/hari2.mp3"
  ,"./foto/foto-1.jpg","./foto/foto-2.jpeg","./foto/foto-3.jpeg","./foto/foto-4.jpeg","./foto/foto-5.jpg","./foto/foto-6.jpeg","./foto/foto-7.jpeg","./foto/foto-8.jpeg","./foto/foto-9.jpeg","./foto/foto-10.jpeg","./foto/foto-11.jpeg","./foto/foto-12.jpeg","./foto/rustam-tabara.webp"
];

self.addEventListener("install", event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate", event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener("fetch", event=>{
  const request = event.request;
  if(request.method !== "GET") return;
  const url = new URL(request.url);
  if(url.origin !== self.location.origin) return;
  // Dokumen dan konfigurasi selalu diprioritaskan dari jaringan supaya
  // perubahan jadwal di localhost langsung terbaca; cache dipakai sebagai
  // fallback saat offline.
  const selaluSegar = url.pathname.endsWith("/") || url.pathname.endsWith("index.html") || url.pathname.endsWith("config.js");
  if(selaluSegar){
    event.respondWith(
      fetch(request, {cache:"no-store"})
        .then(response=>{
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(request, copy));
          return response;
        })
        .catch(()=>caches.match(request).then(cached=>cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached=>cached || fetch(request).then(response=>{
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(request, copy));
      return response;
    }).catch(()=>caches.match("./index.html")))
  );
});
