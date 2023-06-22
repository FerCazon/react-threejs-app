import { useRef, useEffect } from 'react';

const VerticalControls = () => {
  const moveUp = useRef(false);
  const moveDown = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case ' ':
          moveUp.current = true;
          break;
        case 'Control':
          moveDown.current = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case ' ':
          moveUp.current = false;
          break;
        case 'Control':
          moveDown.current = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { moveUp, moveDown };
};

export default VerticalControls;
