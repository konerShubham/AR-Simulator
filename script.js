// ✅ Ensure Three.js is imported first
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.0/build/three.module.js';

// ✅ Define scene at the start of the script
let scene = new THREE.Scene(); // 🔥 This ensures scene exists before usage
console.log("✅ Scene initialized:", scene);

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM fully loaded, initializing Three.js...");

    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
    console.log("✅ Lighting added!");

    let testCube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    scene.add(testCube);
    console.log("✅ Test cube added!");

    // ✅ GPS Data & Marker Placement
    navigator.geolocation.getCurrentPosition((position) => {
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

        let xPos = (lon - 80) * 0.001;
        let yPos = (lat - 20) * 0.001;
        marker.position.set(xPos, yPos, -0.5);

        scene.add(marker);
        console.log('✅ GPS Marker Added at X=${xPos}, Y=${yPos}, Z=-0.5');
    }, (error) => {
        console.error("❌ GPS Error:", error);
    });

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
});