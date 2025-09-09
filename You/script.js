import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg") });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 20;

// Heart Particles
const particles = new THREE.BufferGeometry();
const particleCount = 3000;
const positions = [];

for (let i = 0; i < particleCount; i++) {
  let t = Math.PI * (Math.random() * 2 - 1);
  let u = Math.random() * 2 - 1;

  // Heart equation (2D) extended in 3D
  let x = 16 * Math.pow(Math.sin(t), 3) / 10;
  let y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 10;
  let z = (u * 2);

  positions.push(x, y, z);
}

particles.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.05 });
const heart = new THREE.Points(particles, material);
scene.add(heart);

// Text rotating
const loader = new FontLoader();
loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function(font) {
  const textGeo = new TextGeometry("LOVE ME LOVE ME LOVE ME", {
    font: font,
    size: 1,
    height: 0.1,
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeo, textMaterial);
  textMesh.position.set(-10, -6, 0);
  scene.add(textMesh);

  function animate() {
    requestAnimationFrame(animate);
    heart.rotation.y += 0.002;
    textMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
