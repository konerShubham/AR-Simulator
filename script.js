navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log('📍 GPS received: Latitude = ${lat}, Longitude = ${lon}');

    let markerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    let markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let marker = new THREE.Mesh(markerGeometry, markerMaterial);

    let xPos = (lon - 80) * 0.001;
    let yPos = (lat - 20) * 0.001;

    console.log('📌 Calculated Marker Position: X = ${xPos}, Y = ${yPos}, Z = -0.5');
    marker.position.set(xPos, yPos, -0.5);
    scene.add(marker);
    console.log("✅ GPS marker added!");
}, (error) => {
    console.error("❌ GPS Error:", error);
});