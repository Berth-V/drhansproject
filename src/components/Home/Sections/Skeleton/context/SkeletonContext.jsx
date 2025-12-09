import { useReducer } from 'react';
import { skeletonReducer } from './skeletonReducer';
import { SkeletonContext } from './useSkeletonContext';
import { ZOOM_AREA, RESET_VIEWBOX, SET_PART, DEL_PART } from './constants';

const defaultViewBox = '0 0 700 1000';

const initialState = {
  // Zoom animation
  viewBox: defaultViewBox,
  defaultViewBox,
  selectedPart: null,
};

export const SkeletonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skeletonReducer, initialState);

  // dispatch Fuctions
  const zoomArea = (x, y, width, height) => {
    dispatch({
      type: ZOOM_AREA,
      payload: { x, y, width, height },
    });
  };

  const resetViewBox = () => {
    dispatch({ type: RESET_VIEWBOX });
  };

  const setPartName = (partName) => {
    dispatch({ type: SET_PART, payload: partName });
  };

  const delPartName = () => {
    dispatch({ type: DEL_PART });
  };

  const circleFunctions = (partName, x, y, width, height) => {
    setPartName(partName);
    zoomArea(x, y, width, height);
  };

  const backBtnFunctions = () => {
    resetViewBox();
    delPartName();
  };

  return (
    <SkeletonContext.Provider
      value={{ ...state, circleFunctions, backBtnFunctions }}
    >
      {children}
    </SkeletonContext.Provider>
  );
};
