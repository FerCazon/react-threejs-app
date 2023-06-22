import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Text } from '@react-three/drei';

const Landscape = () => {
  const landscapeRef = useRef();
  const landscape = useGLTF(process.env.PUBLIC_URL + '/projecto unreal/SampleLevel.glb');

  return (
    <>
      <primitive ref={landscapeRef} object={landscape.scene} />
      <Text position={[-7.1, 5, -0.7]} scale={[1.5, 1, 1.5]} rotation={[0, -0.707, 0, 0.707]} color='#59c1bd'>
        HOLOCRUXE
      </Text>
      <Text position={[-2.8, 6.4, -5.7]} scale={[0.5, 1, 1.5]} rotation={[0, Math.PI / 0.66, 0]} color='#59c1bd'>
        Welcome to this journey
      </Text>
      <Text position={[4.39, 5.09, -12.59]} scale={[1, 1, 1.5]} rotation={[0, -0.707, 0, 0.707]} color='#59c1bd'>
        Click to Begin
      </Text>
    </>
  );
};

export default Landscape;
