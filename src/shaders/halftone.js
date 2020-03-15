const vertex = require('./halftone/vertex.shader');
const fragment = require('./halftone/fragment.shader');
const THREE = require('three/build/three.module.js');

function Halftone(specs = {}) {
    let {
        foregroundColor = "#000", 
        backgroundColor = "#fff", 
        density = 2,
        offset = 0,
        doubleSided = false
    } = specs;

    let material = new THREE.ShaderMaterial({
        uniforms: {
            foregroundColor: {value: new THREE.Color(foregroundColor)},
            backgroundColor: {value: new THREE.Color(backgroundColor)},
            density: {value: density},
            offset: {value: offset}
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        depthTest: true,
        transparent: false,
    });

    if (doubleSided) {
        material.side = THREE.DoubleSide;
    }

    return material;
}

module.exports = {
    vertex,
    fragment,
    Halftone
}
