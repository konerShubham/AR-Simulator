navigator.geolocation.watchPosition((position) => {
    if (!position || !position.coords) {
        console.error("❌ GPS data is undefined! Skipping marker addition.");
        return;
    }

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log('📍 GPS received: Latitude = ${lat}, Longitude = ${lon}');

    let markerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    let markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let marker = new THREE.Mesh(markerGeometry, markerMaterial);

    marker.position.set((lon - 80) * 0.001, (lat - 20) * 0.001, -0.5);
    scene.add(marker);
    console.log("✅ GPS marker added!");
}, (error) => {
    console.error("❌ GPS Error:", error);
}, {
    enableHighAccuracy: true
});