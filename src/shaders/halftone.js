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
        lightStrength = 0.5,
        lightDirection = {x: 0.85, y: 0.6, z: 0.75}
    } = specs;

    let material = new THREE.ShaderMaterial({
        uniforms: {
            foregroundColor: {value: new THREE.Color(foregroundColor)},
            backgroundColor: {value: new THREE.Color(backgroundColor)},
            density: {value: density},
            offset: {value: offset},
            lightStrength: {value: lightStrength},
            lightDirection: {
                value: new THREE.Vector3(
                    lightDirection.x,
                    lightDirection.y,
                    lightDirection.z
                )
            }
                                                      
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
