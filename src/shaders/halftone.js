const vertex = require('./halftone/vertex.shader');
const fragment = require('./halftone/fragment.shader');
const THREE = require('three/build/three.module.js');

function Halftone(specs = {}) {
    let {
        foregroundColor = "#000", 
        backgroundColor = "#fff", 
        density = 2,
        offset = 0,
        doubleSided = false,
        transparent = false,
        blockSize = 1.0,
    } = specs;

    let uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        {
            foregroundColor: {value: new THREE.Color(foregroundColor)},
            backgroundColor: {value: new THREE.Color(backgroundColor)},
            density: {value: density},
            offset: {value: offset},
            blockSize: {value: blockSize},
        }
    ]);

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        depthTest: true,
        transparent: transparent,
        lights: true
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
