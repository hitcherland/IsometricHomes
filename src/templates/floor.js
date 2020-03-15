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

    var geo2 = new THREE.EdgesGeometry(geometry);
    var mat2 = new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
        linejoin: "round",
    });
    var wireframe = new THREE.LineSegments(geo2, mat2);

    //mesh.add(wireframe);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
}

module.exports = {
    Floor
};
