import React, { useEffect, useRef } from "react";
import {
  useSpaceBackgroundContext,
  setCanvasDimensions,
  fillStars,
  renderStar,
  SpaceBackgroundProvider,
} from "../Provider/SpaceBackground";

export interface SpaceBackgroundProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

export function SpaceBackgroundCanvas({
  width = 0,
  height = 0,
  ...props
}: SpaceBackgroundProps) {
  const [state, dispatch] = useSpaceBackgroundContext();
  const { stars, numStars, innerWidth, innerHeight } = state;
  const canvasRef = useRef(null);

  useEffect(() => {
    function initCanvas() {
      const canvas = canvasRef.current;

      if (canvas) {
        setCanvasDimensions(dispatch, {
          width,
          height,
          canvas,
        });
      }
    }

    initCanvas();
  }, [width, height, dispatch, canvasRef]);

  useEffect(() => {
    function initStars() {
      const canvas = canvasRef.current;

      if (canvas) {
        fillStars(dispatch, {
          canvas,
          numStars,
          innerWidth,
          innerHeight,
        });
      }
    }

    initStars();
  }, [numStars, innerWidth, innerHeight, dispatch, canvasRef]);

  useEffect(() => {
    function initRenderStars() {
      const canvas = canvasRef.current;

      if (canvas) {
        renderStar(dispatch, {
          canvas,
          stars,
          innerWidth,
          innerHeight,
        });
      }
    }

    initRenderStars();
  }, [stars, innerWidth, innerHeight, dispatch, canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}

export function SpaceBackground(props: SpaceBackgroundProps) {
  return (
    <SpaceBackgroundProvider>
      <SpaceBackgroundCanvas {...props} />
    </SpaceBackgroundProvider>
  );
}
