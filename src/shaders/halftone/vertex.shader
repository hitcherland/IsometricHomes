const THREE = require('three/build/three.module.js');

module.exports = `

#include <shadowmap_pars_vertex>

void main() {
    #include <begin_vertex>
    #include <project_vertex>
    #include <worldpos_vertex>
    #include <shadowmap_vertex>
}`;
