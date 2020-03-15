const THREE = require('three/build/three.module.js');

let ZOOM_SPEED = 1e-2;
let ROTATE_SPEED = Math.PI * 1e-3;

function rotateAboutPoint(object, pivot, a, b, r) {
    var d = object.position.sub(pivot);

    d.applyEuler(new THREE.Euler(-a, -b, 0, 'XYZ'));
    d.add(pivot);

    object.position.set(d.x, d.y, d.z);
    object.lookAt(pivot);
}

function initiateInput(camera, scene) {
    function updateZoom(v) {
            camera.zoom += v;
            if(camera.zoom < 0) {
                camera.zoom = ZOOM_SPEED ;
            }
            camera.updateProjectionMatrix();
    }
    window.addEventListener("keydown", function (event) {
        if (event.code === "Equal" && event.ctrlKey) {
            updateZoom(ZOOM_SPEED * 10);
            camera.updateProjectionMatrix();
            event.preventDefault();
            event.stopPropagation();
        }

        if (event.code === "Minus" && event.ctrlKey) {
            updateZoom(ZOOM_SPEED * -10);
            event.preventDefault();
            event.stopPropagation();
        }

        if (event.code === "Digit0" && event.ctrlKey) {
            camera.zoom = 1;
            camera.updateProjectionMatrix();
            event.preventDefault();
            event.stopPropagation();
        }
    });

    window.addEventListener("wheel", function (event) {
        updateZoom(ZOOM_SPEED * event.deltaY);
        if (event.ctrlKey) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    window.addEventListener("mousemove", function (event) {
        if (event.buttons === 4 || (event.buttons === 1 && event.ctrlKey)) {
            rotateAboutPoint(
                camera,
                scene.position, 
                ROTATE_SPEED * event.movementY,
                ROTATE_SPEED * event.movementX,
                2
            );
        }
    });
}

module.exports = {
    initiateInput
}
