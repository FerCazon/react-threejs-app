import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import VerticalControls from './VerticalControls';

const SPEED = 0.1;
const LOOK_SPEED = 0.002;

const PlayerControls = () => {
  const { camera } = useThree();

  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);

  const verticalControls = VerticalControls();

  const euler = new THREE.Euler(0, 0, 0, 'YXZ');
  const velocity = new THREE.Vector3();

  useEffect(() => {
    const canvas = document.querySelector('.three-canvas');

    const requestPointerLock = () => {
      canvas.requestPointerLock();
    };
  
    canvas.addEventListener('click', requestPointerLock);

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          moveForward.current = true;
          break;
        case 's':
          moveBackward.current = true;
          break;
        case 'a':
          moveLeft.current = true;
          break;
        case 'd':
          moveRight.current = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'w':
          moveForward.current = false;
          break;
        case 's':
          moveBackward.current = false;
          break;
        case 'a':
          moveLeft.current = false;
          break;
        case 'd':
          moveRight.current = false;
          break;
        default:
          break;
      }
    };

    const onMouseMove = (event) => {
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      euler.setFromQuaternion(camera.quaternion);
      euler.y -= movementX * LOOK_SPEED;
      euler.x -= movementY * LOOK_SPEED;
      euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

      camera.quaternion.setFromEuler(euler);
    };

    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
        canvas.removeEventListener('click', requestPointerLock);
      document.removeEventListener('mousemove', onMouseMove, false);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera]);

  

  useFrame(() => {
    
    
    velocity.set(0, 0, 0);

    if (moveForward.current) {
      velocity.z -= 1;
    } else if (moveBackward.current) {
      velocity.z += 1;
    }

    if (moveLeft.current) {
      velocity.x -= 1;
    } else if (moveRight.current) {
      velocity.x += 1;
    }

    if (verticalControls.moveUp.current) {
      velocity.y += 1;
    } else if (verticalControls.moveDown.current) {
      velocity.y -= 1;
    }

    
    velocity.normalize().multiplyScalar(SPEED);
    camera.translateX(velocity.x);
    camera.translateY(velocity.y);
    camera.translateZ(velocity.z);
  });

  return null;
};

export default PlayerControls;
