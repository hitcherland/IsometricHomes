import * as THREE from 'three/build/three.module.js';
import {initiateInput} from './input.js';
import textures from './textures.js';
import shaders from './shaders.js';
import templates from './templates.js';
import layout from './layout.json';

var camera, scene, renderer;
var geometry, material, mesh;
let d = 5;

document.body.style.margin = 0;
document.body.style.oveflow = "hidden";

function parseLayout(layout) {
    let {
        textures: in_textures = {},
        materials: in_materials = {},
        scene: in_scene = {objects: []}
    } = layout;
    let out_textures = {};

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
            out_materials[name] = new shaders[material](attributes);
        }
    });

    let out_objects = {};
    in_scene.objects.forEach(function (object) {
        let {
            name = "",
            template = "Walls",
            position = {x: 0, y: 0, z: 0},
            attributes = {
                material: undefined
            }
        } = object;

        attributes.material = out_materials[attributes.material];
        let out_object = new templates[template](attributes);
        out_object.position.set(position.x, position.y, position.z);
        out_objects[name] = out_object;
        scene.add(out_objects[name]);
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
    document.body.appendChild(renderer.domElement);
    
    scene = new THREE.Scene();


    let aspect = width / height;
    camera = new THREE.OrthographicCamera(
        -d * aspect,
        d * aspect,
        d,
        -d,
        0.01,
        100
    );
    camera.position.set(-d, d, d);
    camera.lookAt(scene.position);

    var gridHelper = new THREE.GridHelper(10, 10, "rgba(0,0,0,0.2)", "rgba(0,0,0,0.1)");
    scene.add(gridHelper);

    initiateInput(camera, scene);
    parseLayout(layout);

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
}
