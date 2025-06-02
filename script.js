import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.0/build/three.module.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM fully loaded, initializing Three.js...");

    let scene = new THREE.Scene();
    console.log("✅ Scene initialized:", scene);

    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    console.log("✅ Scene successfully initialized!");

    let testCube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    scene.add(testCube);
    console.log("✅ Test cube added!");

    navigator.geolocation.getCurrentPosition((position) => {
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
    });

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
});