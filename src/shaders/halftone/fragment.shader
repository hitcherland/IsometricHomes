module.exports = `
uniform vec3 foregroundColor;
uniform vec3 backgroundColor;
uniform float density;
uniform float offset;

void main() {
    //gl_FragCoord
    float x_offset = mod(gl_FragCoord.y, density);
    bool x = mod(gl_FragCoord.x + offset * x_offset, density) <= 0.5;
    if (x) {
        gl_FragColor = vec4(foregroundColor, 1.0);
    } else {
        gl_FragColor = vec4(backgroundColor, 1.0);
    }
}`
