import * as THREE from 'three';

// Buat canvas dan tambahkan ke body
const canvas = document.createElement('canvas');
canvas.className = 'webgl';
document.body.prepend(canvas);

// Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 15);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Bintang
const STAR_COUNT = 800;
const positions = new Float32Array(STAR_COUNT * 3);
const speeds = new Float32Array(STAR_COUNT);

for (let i = 0; i < STAR_COUNT; i++) {
  positions[i*3] = (Math.random() - 0.5) * 80;
  positions[i*3+1] = (Math.random() - 0.5) * 50;
  positions[i*3+2] = (Math.random() - 0.5) * 30 - 5;
  speeds[i] = 0.02 + Math.random() * 0.06;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const colors = new Float32Array(STAR_COUNT * 3);
for (let i = 0; i < STAR_COUNT; i++) {
  colors[i*3] = 0;
  colors[i*3+1] = 229/255;
  colors[i*3+2] = 1.0;
}
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.12,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

// Animasi
function animate() {
  requestAnimationFrame(animate);
  const pos = stars.geometry.attributes.position.array;
  for (let i = 0; i < STAR_COUNT; i++) {
    pos[i*3] += speeds[i];
    if (pos[i*3] > 45) {
      pos[i*3] = -45;
      pos[i*3+1] = (Math.random() - 0.5) * 50;
      pos[i*3+2] = (Math.random() - 0.5) * 30 - 5;
      speeds[i] = 0.02 + Math.random() * 0.07;
    }
  }
  stars.geometry.attributes.position.needsUpdate = true;
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});