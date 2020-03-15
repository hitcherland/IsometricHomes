module.exports = `
uniform vec3 lightDirection;
uniform float lightStrength;
varying float vLighting;
void main() {
    vec3 directionalVector = normalize(lightDirection);
    vLighting = (1.0 - lightStrength) + lightStrength * dot(normal, directionalVector);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`
