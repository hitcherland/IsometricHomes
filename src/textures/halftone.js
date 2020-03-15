const THREE = require('three/build/three.module.js');

function HalftoneTexture(specs = {}) {
    let {
        density = 4,
        size = 8,
        y_offset = 3,
        foregroundColor = [0, 0, 0, 255],
        backgroundColor = [255, 255, 255, 255]
    } = specs;

    let data = new Uint8Array(new Array(size * size * 4));
    data.forEach(function (ignore, i) {
        let pixel_i = Math.floor(i / 4);
        let color_i = i % 4;
        let x = pixel_i % size;
        let y = Math.floor(pixel_i / size);

        let offset = (
            (y % (2 + 2 * y_offset) === 0)
            ? 2 * y_offset
            : 0
        );
        let x_pass = (x + offset) % density === 0;
        let y_pass = y % density === 0;
        if (x_pass && y_pass) {
            data[i] = foregroundColor[color_i];
        } else {
            data[i] = backgroundColor[color_i];
        }
    });

    let texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
}

module.exports = {
    HalftoneTexture
}
