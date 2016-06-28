import './utils';
import './models/morpheus';
import './gl';

import wagner from 'wagner-core';

const fragment = `
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
}
`;

const vertex = `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;


void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;
}
`;

window.onload = function onAppInit() {
  wagner.invoke(function (logger, glInit) {
    const log = logger('app');
    const gl = glInit(document.getElementById('morpheus'), fragment, vertex);
    wagner.invoke((scene, pano) => {
      scene.bySceneId(1010)
        .then(response => response.data)
        .then(pano.withContext(gl).forScene)
        .then(panoView => panoView.glDraw());
    });
    log.info('app:init');
  });
};