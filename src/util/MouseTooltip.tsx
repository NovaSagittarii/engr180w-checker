/**
 * https://github.com/marlo22/react-sticky-mouse-tooltip/blob/master/src/MouseTooltip.jsx
 * rewritten by chatgpt :^)
 * https://chat.openai.com/share/58dcf8fb-d1b7-4c18-8b33-449e026099d8
 */

import React, { useState, useEffect } from 'react';

interface MouseTooltipProps {
  visible?: boolean;
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MouseTooltip: React.FC<MouseTooltipProps> = ({
  visible = true,
  children,
  offsetX = 0,
  offsetY = 0,
  className,
  style,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ xPosition: 0, yPosition: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);
  const [listenerActive, setListenerActive] = useState(false);

  const getTooltipPosition = ({ clientX, clientY }: MouseEvent) => {
    setTooltipPosition({
      xPosition: clientX,
      yPosition: clientY,
    });
    setMouseMoved(true);
  };

  const addListener = () => {
    window.addEventListener('mousemove', getTooltipPosition);
    setListenerActive(true);
  };

  const removeListener = () => {
    window.removeEventListener('mousemove', getTooltipPosition);
    setListenerActive(false);
  };

  const updateListener = () => {
    if (!listenerActive && visible) {
      addListener();
    }

    if (listenerActive && !visible) {
      removeListener();
    }
  };

  useEffect(() => {
    addListener();

    return () => {
      removeListener();
    };
  }, []);

  useEffect(() => {
    updateListener();
  }, [visible]);

  return (
    <div
      className={className}
      style={{
        display: visible && mouseMoved ? 'block' : 'none',
        position: 'fixed',
        top: tooltipPosition.yPosition + offsetY,
        left: tooltipPosition.xPosition + offsetX,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default MouseTooltip;
