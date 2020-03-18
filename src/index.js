import * as THREE from 'three/build/three.module.js';
import {initiateInput} from './input.js';
import textures from './textures.js';
import shaders from './shaders.js';
import templates from './templates.js';
import layout from './layout.json';

var camera, scene, renderer;
var geometry, material, mesh;
let d = Math.sqrt(2 * 5 * 5); //cell width = 5

document.body.style.margin = 0;
document.body.style.overflow = "hidden";

function parseLayout(layout, light) {
    let {
        textures: in_textures = {},
        materials: in_materials = {},
        scene: in_scene = {objects: []}
    } = layout;
    let out_textures = {};
    let lightDirection = {
        x: -light.position.x, 
        y: light.position.y,
        z: -light.position.z
    };

    Object.entries(in_textures).forEach(function (entry) {
        let [name, {template, attributes = {}}] = entry;
        out_textures[name] = textures[template](attributes);
    });

    let out_materials = {};
    Object.entries(in_materials).forEach(function (entry) {
        let [name, {group = "basic", material, attributes = {}}] = entry;
        if(group == "basic") {
            out_materials[name] = new THREE.MeshBasicMaterial({
                map: out_textures[attributes.map]
            });
        } else if (group == "shader") {
            attributes.lightDirection = lightDirection;
            out_materials[name] = new shaders[material](attributes);
        }
    });

    let out_objects = {};
    in_scene.objects.forEach(function (object) {
        let {
            name = "",
            template = "Walls",
            visible = true,
            position = {x: 0, y: 0, z: 0},
            attributes = {
                material: undefined
            }
        } = object;

        attributes.material = out_materials[attributes.material];
        let out_object = new templates[template](attributes);
        out_object.position.set(position.x, position.y, position.z);
        out_objects[name] = out_object;
        out_object.receiveShadow = true;
        out_object.castShadow = true;

        if (visible) {
            scene.add(out_object);
        }
    });
}

init();
animate();

function init() {
    let {
        innerWidth: width = 0,
        innerHeight: height = 0,
    } = window;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    
    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var light = new THREE.DirectionalLight(0xffffff, 1, 100);
    light.position.set(7, 7, 10);
    light.castShadow = true;
    scene.add(light);

    let aspect = width / height;

    light.shadow.mapSize.width = 512 * 8;  // default
    light.shadow.mapSize.height = 512 * 8; // default
    light.shadow.camera.near = 0.5;    // default
    light.shadow.camera.far = 500;     // default
    light.shadow.camera.left = -d * aspect;
    light.shadow.camera.right = d * aspect;
    light.shadow.bias -= 8e-5

    camera = new THREE.OrthographicCamera(
        -d * aspect, d * aspect,
        d, -d,
        0.01, 100
    );
    camera.position.set(-d, d, d);
    camera.lookAt(scene.position);

    initiateInput(camera, scene);
    parseLayout(layout, light);
    window.addEventListener("resize", function() {
        let {
            innerWidth: width = 0,
            innerHeight: height = 0,
        } = window;

        let aspect = width / height;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    scene.rotation.y += Math.PI * 1e-3; 
}
