const THREE = require('three/build/three.module.js');

function Floor(specs) {
    let {
        points = [],
        material
    } = specs;

    let shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].z);
    points.slice(1).forEach(function (p, i, ps) {
        shape.lineTo(p.x, p.z);
    });
    shape.lineTo(points[0].x, points[0].z);

    let geometry = new THREE.ShapeGeometry(shape);
    let mesh =  new THREE.Mesh(geometry, material);

    //mesh.add(wireframe);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
}

module.exports = {
    Floor
};
