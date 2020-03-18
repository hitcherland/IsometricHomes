const THREE = require('three/build/three.module.js');

function ExtrudePath(specs = {}) {
    let {
        points = [],
        direction = {x: 0, y: 1, z: 0},
        length = 1,
        material,
        closePath = true
    } = specs;


    let vecDir = new THREE.Vector3(direction.x,
                                   direction.y,
                                   direction.z).normalize()
                                               .multiplyScalar(length);

    let geometry = new THREE.Geometry();

    points.forEach(function (p, i, ps) {
        let P = new THREE.Vector3(p.x, p.y, p.z);
        let Q = P.clone().add(vecDir); 

        geometry.vertices.push(P, Q);
        if (!closePath && i + 1 === ps.length) {
            return;
        }

        let j = (i + 1) % ps.length;
        let R = new THREE.Vector3(ps[j].x, ps[j].y, ps[j].z);
        let S = R.clone().add(vecDir); 

        let normal = (P.clone().sub(Q)).cross(R .clone().sub(Q)).normalize();
        let flipNormal = normal.clone().negate();

        let I = 2 * i;
        let J = 2 * i + 1;
        let K = (2 * i + 2) % (2 * ps.length);
        let L = (2 * i + 3) % (2 * ps.length);

        geometry.faces.push(
            new THREE.Face3(I, J, K, normal),
            new THREE.Face3(I, K, J, flipNormal),
            new THREE.Face3(J, L, K, normal),
            new THREE.Face3(J, K, L , flipNormal)
        );
    });

    geometry.computeBoundingSphere();
    let mesh =  new THREE.Mesh(geometry, material);
    return mesh;
}

function FlatWall(specs = {}) {
    let {
        points = [],
        height = 1,
        material,
        closePath = true
    } = specs;

    return new ExtrudePath({
        points,
        length: height,
        direction: {x: 0, y: 1, z: 0},
        material,
        closePath
    })
}

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
    Wall,
    FlatWall
};
