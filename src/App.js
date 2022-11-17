import * as React from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';
import woodImg from './wood.jpg';
import rockImg from './rock.jpeg';
import goldImg from './gold.jpg';

// // custom shape
// const x = 0, y = 0;
// const heartShape = new THREE.Shape();
// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
// const geometry = new THREE.ShapeGeometry( heartShape )
// const heartMat = new THREE.MeshNormalMaterial(({
//     side: THREE.DoubleSide
// }));
// const heartMesh = new THREE.Mesh(geometry, heartMat);
// scene.add(heartMesh);

const wood = new THREE.TextureLoader().load(woodImg);
const golden = new THREE.TextureLoader().load(goldImg);
const rock = new THREE.TextureLoader().load(rockImg);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 2000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

const amberLight = new THREE.AmbientLight(0x333333, 3);

const dl = new THREE.DirectionalLight(0x333333, 3);
const dlh = new THREE.DirectionalLightHelper(dl);

const sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
// const sphereMaterial = new THREE.MeshStandardMaterial(({
//     color: 0x00ffff,
//     wireframe: true
// }));
const sphereMaterial = new THREE.MeshStandardMaterial({map: rock, wireframe: true});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

const cubeGeometry = new THREE.SphereGeometry(0.1, 100, 100);
// const planMateriel = new THREE.MeshStandardMaterial(({
//     color: '#0d9e85',
//     // wireframe: true
// }));
const planMateriel = new THREE.MeshStandardMaterial({map: golden});
const cubeMesh = new THREE.Mesh(cubeGeometry, planMateriel)

const planeGeometry = new THREE.PlaneGeometry(115, 115);
// const planeMateriel = new THREE.MeshStandardMaterial(({
//     color: '#191d2c',
//     side: THREE.DoubleSide
// }));
const planeMateriel = new THREE.MeshStandardMaterial({map: wood, side: THREE.DoubleSide});
const planeMesh = new THREE.Mesh(planeGeometry, planeMateriel)

const orbitControl = new OrbitControls(camera, renderer.domElement);

dl.castShadow = true;
sphereMesh.castShadow = true;
cubeMesh.rotation.y = 0.75
cubeMesh.castShadow = true;
planeMesh.receiveShadow = true;
sphereMesh.scale.set(0.1, 0.1, 0.1)
planeMesh.rotation.x = -0.5 * Math.PI;
planeMesh.position.y = -0.5;
dl.position.set(0, 2, -2);

scene.add(amberLight)
scene.add(dl)
scene.add(dlh)
scene.add(planeMesh)
scene.add(cubeMesh)
scene.add(sphereMesh);

camera.position.z = 2;
camera.position.y = 1;

orbitControl.update();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop((time) => animation(time));
document.body.appendChild(renderer.domElement)

let step = 0;
let speed = 0.05;

function animation(time) {
    cubeMesh.rotation.y = time / 3000;
    cubeMesh.rotation.x = time / 3000;
    // cubeMesh.position.y = Math.abs(Math.sin(step)) / 3
    // cubeMesh.position.z = time / 4000;

    sphereMesh.rotation.x = time / 1500;
    sphereMesh.position.y = Math.abs(Math.sin(step)) / 3
    // sphereMesh.position.z = time / 4000;

    step += speed;
    renderer.render(scene, camera)
}

export default function App() {
    return (<div/>)
}