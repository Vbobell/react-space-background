import React, { useContext, useReducer, createContext, Dispatch } from "react";
import { Star } from "../model";
import {
  SpaceBackground,
  ACTION,
  DISPATCH,
  Canvas,
} from "../interfaces/SpaceBackground";

export const initialContext: SpaceBackground = {
  fps: 50,
  numStars: 300,
  innerWidth: 0,
  innerHeight: 0,
  stars: [],
};

export const SpaceBackgroundStateContext = createContext<SpaceBackground>(
  initialContext
);

export const SpaceBackgroundDispatchContext = createContext<Dispatch<DISPATCH>>(
  () => {}
);

const spaceBackgroundReducer = (state: SpaceBackground, action: DISPATCH) => {
  switch (action.type) {
    case ACTION.FILL_STARS:
    case ACTION.SET_CANVAS_DIMENSIONS:
      return {
        ...state,
        ...action.state,
      };
    case ACTION.RENDER_STARS:
      return {
        ...state,
      };
    case ACTION.ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export function SpaceBackgroundProvider({
  children,
  ...props
}: {
  children: HTMLElement;
}) {
  const [state, dispatch] = useReducer(spaceBackgroundReducer, {
    ...initialContext,
  });

  return (
    <SpaceBackgroundStateContext.Provider value={state} {...props}>
      <SpaceBackgroundDispatchContext.Provider value={dispatch}>
        {children}
      </SpaceBackgroundDispatchContext.Provider>
    </SpaceBackgroundStateContext.Provider>
  );
}

export function useSpaceBackgroundState() {
  const context = useContext(SpaceBackgroundStateContext);

  if (!context) {
    throw new Error(
      "useSpaceBackgroundState must be used after an SpaceBackgroundStateContext.Provider"
    );
  }

  return context;
}

export function useSpaceBackgroundDispatch() {
  const context = useContext(SpaceBackgroundDispatchContext);

  if (!context) {
    throw new Error(
      "useSpaceBackgroundDispatch must be used after and SpaceBackgroundDispatchContext.Provider"
    );
  }

  return context;
}

export function useSpaceBackgroundContext(): [
  SpaceBackground,
  Dispatch<DISPATCH>
] {
  return [useSpaceBackgroundState(), useSpaceBackgroundDispatch()];
}

export function setCanvasDimensions(
  dispatch: Dispatch<DISPATCH>,
  { width, height, canvas }: Canvas
) {
  canvas.setAttribute("width", String(width));
  canvas.setAttribute("height", String(height));

  return dispatch({
    type: ACTION.SET_CANVAS_DIMENSIONS,
    state: {
      innerWidth: parseInt(String(width)),
      innerHeight: parseInt(String(height)),
    },
  });
}

export function fillStars(
  dispatch: Dispatch<DISPATCH>,
  { innerWidth, innerHeight, canvas, numStars }: SpaceBackground
) {
  const stars = [];

  if (numStars) {
    for (var i = 0; i < numStars; i++) {
      var x = Math.round(Math.random() * (innerWidth ?? 0));
      var y = Math.round(Math.random() * (innerHeight ?? 0));
      var opacity = Math.random() * 0.5;

      if (canvas) {
        var star = new Star(x, y, opacity, canvas);
        stars.push(star);
      }
    }

    return dispatch({
      type: ACTION.FILL_STARS,
      state: { numStars, stars },
    });
  }
}

export function renderStar(
  dispatch: Dispatch<DISPATCH>,
  { innerWidth = 0, innerHeight = 0, canvas, stars = [] }: SpaceBackground
) {
  if (canvas) {
    let ctx = canvas.getContext("2d");

    ctx?.clearRect(0, 0, innerWidth, innerHeight);

    stars.forEach(function(star) {
      star.draw();
    });

    return dispatch({
      type: ACTION.RENDER_STARS,
      state: { stars },
    });
  }
}

export default spaceBackgroundReducer;
