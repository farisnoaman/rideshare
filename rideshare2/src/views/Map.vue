<template>
  <div class="map-container">
    <h2>Rideshare Map</h2>
    <div id="map" style="height: 400px;"></div>
    <div class="status">
      <p>Your current location: {{ location.latitude }}, {{ location.longitude }}</p>
      <p>Nearby drivers: {{ nearbyDrivers }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'

export default {
  name: 'Map',
  setup() {
    const location = ref({ latitude: 0, longitude: 0 })
    const nearbyDrivers = ref(0)
    let map = null
    let marker = null
    let watchId = null

    const updateLocation = (position) => {
      location.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      if (map) {
        map.setView([location.value.latitude, location.value.longitude], 13)
        if (marker) {
          marker.setLatLng([location.value.latitude, location.value.longitude])
        } else {
          marker = L.marker([location.value.latitude, location.value.longitude]).addTo(map)
        }
      }
    }

    const simulateNearbyDrivers = () => {
      nearbyDrivers.value = Math.floor(Math.random() * 5) + 1
    }

    onMounted(() => {
      // Ensure Leaflet is loaded before initializing the map
      if (typeof L !== 'undefined') {
        map = L.map('map').setView([0, 0], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        if ('geolocation' in navigator) {
          watchId = navigator.geolocation.watchPosition(updateLocation)
        }

        const interval = setInterval(simulateNearbyDrivers, 5000)

        onUnmounted(() => {
          if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId)
          }
          clearInterval(interval)
          if (map) {
            map.remove()
          }
        })
      } else {
        console.error('Leaflet is not loaded')
      }
    })

    return {
      location,
      nearbyDrivers
    }
  }
}
</script>

<style scoped>
.map-container {
  max-width: 800px;
  margin: 0 auto;
}

.status {
  margin-top: 20px;
}
</style>