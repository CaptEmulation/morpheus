import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  GUI,
  Folder,
  Number as DGNumber,
} from 'dis-gui';

import { positionCamera } from '../../actions/scene';
import { setSensitivity } from '../../actions/pano';
import { setHotspotsTheta } from '../../actions/hotspots';
import store from '../../store';

function mapStateToProps({ scene, pano, hotspots }) {
  const {
    camera,
  } = scene;

  const {
    sensitivity,
  } = pano;

  const {
    theta: hotspotsTheta,
  } = hotspots;

  return {
    camera,
    sensitivity,
    hotspotsTheta,
  };
}

function mapDisptachToProps(dispatch) {
  return {
    setCameraPositionZ(z) {
      dispatch(positionCamera({ z }));
    },
    setSensitivity(sensitivity) {
      dispatch(setSensitivity(sensitivity));
    },
    setHotspotsTheta(theta) {
      dispatch(setHotspotsTheta(theta));
    },
  };
}

const Tools = ({
  camera,
  sensitivity,
  hotspotsTheta,
  setHotspotsTheta,
  setCameraPositionZ,
  setSensitivity
}) => {
  const cameraTools = [];
  if (camera) {
    cameraTools.push(<DGNumber label="Translate Z" key="camera:z" value={camera.position.z} min={-5} max={5} step={0.001} onChange={setCameraPositionZ}/>);
  }
  return (
    <GUI style={{ controlWidth: 500 }}>
      <Folder label='Camera'>
        {cameraTools}
      </Folder>
      <Folder label='Scene'>
        <DGNumber label="Sensitivity" key="scene:sensitivity" value={sensitivity} min={20} max={200} step={1} onChange={setSensitivity}/>
      </Folder>
      <Folder label='Hotspots'>
        <DGNumber label="Theta" key="hotspots:theta" value={hotspotsTheta} min={-Math.PI} max={Math.PI} step={0.0001} onChange={setHotspotsTheta}/>
      </Folder>
    </GUI>
  );
};

Tools.propTypes = {
  camera: PropTypes.object,
  sensitivity: PropTypes.number,
  setCameraPositionZ: PropTypes.func.isRequired,
  setSensitivity: PropTypes.func.isRequired,
};


export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(Tools);
