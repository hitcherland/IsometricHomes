const THREE = require('three/build/three.module.js');
module.exports = `
uniform vec3 foregroundColor;
uniform vec3 backgroundColor;
uniform float density;
uniform float offset;
uniform float blockSize;

#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

float int_divide(float a, float b) {
    return a - mod(a, b);
}

void main() {
    float shadow = (receiveShadow ? getShadowMask(): 1.0);
    float X = int_divide(gl_FragCoord.x, blockSize);
    float Y = int_divide(gl_FragCoord.y, blockSize);

    float x_offset = mod(Y, density);
    bool x = mod(X + offset * x_offset, density) <= 0.5;
    if (x) {
        vec3 light = (0.8 + 0.2 * shadow) * foregroundColor;
        gl_FragColor = vec4(light, 1.0);
    } else {
        vec3 light = (0.8 + 0.2 * shadow) * backgroundColor;
        gl_FragColor = vec4(light, 1.0);
    }
}`
