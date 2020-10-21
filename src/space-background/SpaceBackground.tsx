import React, { useEffect, useRef } from "react";
import {
  useSpaceBackgroundState,
  useSpaceBackgroundDispatch,
  setCanvasDimensions,
  fillStars,
  renderStar,
} from "../Provider/SpaceBackground";

interface Props extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

export const SpaceBackground: React.FC<Props> = ({
  width = 0,
  height = 0,
  ...props
}) => {
  const state = useSpaceBackgroundState();
  const dispatch = useSpaceBackgroundDispatch();
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
  }, [width, height, dispatch]);

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
  }, [numStars, innerWidth, innerHeight, dispatch]);

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
  }, [stars, innerWidth, innerHeight, dispatch]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};
