import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.rotation.z = 180/180*Math.PI;
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

//Adiciona uma luz ambiente
const hlight = new THREE.AmbientLight (0x404040, 100);
scene.add(hlight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
let sniffer;
loader.load( '/sniffer/scene.gltf', function ( gltf ) {

	sniffer = gltf.scene.children[0];
	scene.add( gltf.scene );

	if ( WebGL.isWebGLAvailable() ) {

		// Initiate function or other initializations here
		animate();
	
	} else {
	
		const warning = WebGL.getWebGLErrorMessage();
		document.getElementById( 'container' ).appendChild( warning );
	
	}

}, undefined, function ( error ) {
	
	console.error( error );

} );

function animate() {
	renderer.render( scene, camera );
	sniffer.rotation.z += 0.01;
	requestAnimationFrame( animate );
}