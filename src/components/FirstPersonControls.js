import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const SPEED = 0.1;

const FirstPersonControls = () => {
    const { camera } = useThree();
    const moveForward = useRef(false);
    const moveBackward = useRef(false);
    const moveLeft = useRef(false);
    const moveRight = useRef(false);
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        switch (event.key) {
          case "w":
            moveForward.current = true;
            break;
          case "s":
            moveBackward.current = true;
            break;
          case "a":
            moveLeft.current = true;
            break;
          case "d":
            moveRight.current = true;
            break;
          default:
            break;
        }
      };
  
      const handleKeyUp = (event) => {
        switch (event.key) {
          case "w":
            moveForward.current = false;
            break;
          case "s":
            moveBackward.current = false;
            break;
          case "a":
            moveLeft.current = false;
            break;
          case "d":
            moveRight.current = false;
            break;
          default:
            break;
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

  useFrame(() => {
    if (moveForward.current) {
      camera.position.z -= SPEED;
    }
    if (moveBackward.current) {
      camera.position.z += SPEED;
    }
    if (moveLeft.current) {
      camera.position.x -= SPEED;
    }
    if (moveRight.current) {
      camera.position.x += SPEED;
    }
  });

  return null;
};

export default FirstPersonControls;
