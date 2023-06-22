import React from 'react';
import { Canvas } from '@react-three/fiber';
import Landscape from './components/landscape';
import './ThreeScene.css';
import PlayerControls from './components/PlayerControls';

const ThreeScene = () => {
  return (
    <Canvas className="three-canvas" style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.5, 8, 5]} intensity={1} />
     <PlayerControls/>
      <Landscape />
    </Canvas>
  );
};

export default ThreeScene;
