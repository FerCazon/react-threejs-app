import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three"

const MouseControls = () => {
  const { camera } = useThree();

  const yawObject = useRef(new THREE.Object3D());
  const pitchObject = useRef(new THREE.Object3D());
  pitchObject.current.add(camera);

  yawObject.current.add(pitchObject.current);

  const onMouseMove = (event) => {
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    yawObject.current.rotation.y -= movementX * 0.002;
    pitchObject.current.rotation.x -= movementY * 0.002;    
    pitchObject.current.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, pitchObject.current.rotation.x)
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove, false);
    return () => {
      document.removeEventListener("mousemove", onMouseMove, false);
    };
  }, []);

  useFrame(() => {
    camera.quaternion.copy(yawObject.current.quaternion).multiply(pitchObject.current.quaternion);
  });

  return null;
};

export default MouseControls;
