const THREE = require('three/build/three.module.js');

function Wall(specs) {
    let {
        points = [],
        height = 1,
        width = 1,
        material
    } = specs;

    let curve = new THREE.CurvePath();
    points.map(function (p) {
        return new THREE.Vector3(p.x, p.y, p.z);
    }).forEach(function (p, i, ps) {
        let q = ps[(i + 1) % ps.length];
        curve.add(new THREE.LineCurve3(p, q));
    });

    let extrudeSettings = {
        depth: 1,
        curveSegments: 1,
        steps: points.length * 8,
        bevelEnabled: false,
        extrudePath: curve
    };

    let shape = new THREE.Shape();
    shape.moveTo(0, width);
    shape.lineTo(0, 0);
    shape.lineTo(-height, 0);
    shape.lineTo(-height, width);

    let geometry = new THREE.ExtrudeGeometry(
        shape,
        extrudeSettings
    );
    let mesh =  new THREE.Mesh(geometry, material);

    var geo2 = new THREE.EdgesGeometry(geometry);
    var mat2 = new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
        linejoin: "round",
    });
    var wireframe = new THREE.LineSegments(geo2, mat2);

    //mesh.add(wireframe);
    return mesh;
}

module.exports = {
    Wall
};
