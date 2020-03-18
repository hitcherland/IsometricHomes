const THREE = require('three/build/three.module.js');

function SimpleRoof(specs) {
    let {
        corners = [],
        height = 1,
        material
    } = specs;

    let [a, b, c, d] = corners.map(function (v) {
        return new THREE.Vector3(v.x, v.y, v.z);
    });
    let mid = corners.reduce(function (o, v) {
        return o.add(v);
    }, new THREE.Vector3()).divideScalar(corners.length);
    mid.y += height;

    let geometry = new THREE.Geometry();
    geometry.vertices.push(mid, a, b, c, d);
    geometry.faces.push(
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 4, 3),
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(1, 2, 4),
        new THREE.Face3(2, 3, 4)
    );

    geometry.computeFaceNormals();

    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

module.exports = {
    SimpleRoof,
};
