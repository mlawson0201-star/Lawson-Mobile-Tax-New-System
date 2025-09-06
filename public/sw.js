
// LMT Tax Service Worker - Phase 1 Enhanced Features
const CACHE_NAME = 'lmt-tax-v1.2.0'
const STATIC_CACHE = 'lmt-static-v1.2.0'
const DYNAMIC_CACHE = 'lmt-dynamic-v1.2.0'
const API_CACHE = 'lmt-api-v1.2.0'

// Files to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/welcome',
  '/crm',
  '/tax-evaluation',
  '/services',
  '/client/onboarding',
  '/phase1-features',
  '/lmt-logo-optimized.png',
  '/lmt-avatar.jpg',
  '/manifest.json'
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/crm/stats',
  '/api/crm/activities',
  '/api/crm/leads',
  '/api/phase1/analytics'
]

// Install Service Worker
self.addEventListener('install', event => {
  console.log('LMT Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log('LMT Service Worker: Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  
  // Skip waiting to activate immediately
  self.skipWaiting()
})

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('LMT Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== API_CACHE) {
            console.log('LMT Service Worker: Deleting old cache', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Take control of all pages immediately
  self.clients.claim()
})

// Fetch Strategy - Network First with Cache Fallback
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }
  
  // Handle static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(handleStaticRequest(request))
    return
  }
  
  // Handle dynamic content
  event.respondWith(handleDynamicRequest(request))
})

// API Request Handler - Cache First for GET, Network Only for POST/PUT/DELETE
async function handleApiRequest(request) {
  const url = new URL(request.url)
  
  if (request.method === 'GET') {
    try {
      // Try network first
      const networkResponse = await fetch(request)
      
      if (networkResponse.ok) {
        // Cache successful response
        const cache = await caches.open(API_CACHE)
        cache.put(request, networkResponse.clone())
        return networkResponse
      }
      
      throw new Error('Network response not ok')
    } catch (error) {
      // Fallback to cache
      const cachedResponse = await caches.match(request)
      if (cachedResponse) {
        return cachedResponse
      }
      
      // Return offline response for critical APIs
      if (url.pathname.includes('stats') || url.pathname.includes('analytics')) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Offline - cached data not available',
          offline: true
        }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      throw error
    }
  } else {
    // POST/PUT/DELETE - Network only, queue if offline
    try {
      return await fetch(request)
    } catch (error) {
      // Queue the request for when online
      await queueRequest(request)
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Request queued for when online',
        queued: true
      }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}

// Static Request Handler - Cache First
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline.html')
      return offlineResponse || new Response('Offline', { status: 503 })
    }
    
    throw error
  }
}

// Dynamic Request Handler - Network First with Cache Fallback
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline.html')
      return offlineResponse || new Response('Offline - Please check your connection', { 
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      })
    }
    
    throw error
  }
}

// Queue requests for background sync
async function queueRequest(request) {
  const requestData = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: request.method !== 'GET' ? await request.text() : null,
    timestamp: Date.now()
  }
  
  // Store in IndexedDB for background sync
  const db = await openDB()
  const transaction = db.transaction(['requests'], 'readwrite')
  const store = transaction.objectStore('requests')
  await store.add(requestData)
}

// IndexedDB helper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LMTTaxDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = () => {
      const db = request.result
      
      if (!db.objectStoreNames.contains('requests')) {
        const store = db.createObjectStore('requests', { autoIncrement: true })
        store.createIndex('timestamp', 'timestamp')
      }
    }
  })
}

// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncQueuedRequests())
  }
})

async function syncQueuedRequests() {
  try {
    const db = await openDB()
    const transaction = db.transaction(['requests'], 'readwrite')
    const store = transaction.objectStore('requests')
    const requests = await store.getAll()
    
    for (const requestData of requests) {
      try {
        const response = await fetch(requestData.url, {
          method: requestData.method,
          headers: requestData.headers,
          body: requestData.body
        })
        
        if (response.ok) {
          // Remove successful request from queue
          await store.delete(requestData.id)
        }
      } catch (error) {
        console.log('Background sync failed for request:', requestData.url)
      }
    }
  } catch (error) {
    console.log('Background sync error:', error)
  }
}

// Push Notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/lmt-logo-128.png',
      badge: '/lmt-logo-64.png',
      vibrate: [100, 50, 100],
      data: data.data || {},
      actions: data.actions || [
        {
          action: 'open',
          title: 'Open App',
          icon: '/lmt-logo-64.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ],
      requireInteraction: data.requireInteraction || false,
      tag: data.tag || 'lmt-notification'
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'LMT Tax Update', options)
    )
  }
})

// Notification Click Handler
self.addEventListener('notificationclick', event => {
  event.notification.close()
  
  const action = event.action
  const data = event.notification.data
  
  if (action === 'dismiss') {
    return
  }
  
  // Default action or 'open' action
  event.waitUntil(
    clients.matchAll().then(clientList => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus()
        }
      }
      
      // Open new window
      if (clients.openWindow) {
        const url = data?.url || '/crm'
        return clients.openWindow(url)
      }
    })
  )
})

// Message handler for communication with main app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    getCacheStatus().then(status => {
      event.ports[0].postMessage(status)
    })
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ success: true })
    })
  }
})

// Get cache status
async function getCacheStatus() {
  const cacheNames = await caches.keys()
  const status = {}
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const keys = await cache.keys()
    status[cacheName] = {
      size: keys.length,
      keys: keys.map(key => key.url)
    }
  }
  
  return status
}

// Clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys()
  await Promise.all(cacheNames.map(name => caches.delete(name)))
}

console.log('LMT Tax Service Worker loaded successfully!')
