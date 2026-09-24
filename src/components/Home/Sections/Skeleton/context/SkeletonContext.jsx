import { useReducer, useCallback } from 'react';
import { skeletonReducer } from './skeletonReducer';
import { SkeletonContext } from './useSkeletonContext';
import { ZOOM_AREA, RESET_VIEWBOX, SET_PART, DEL_PART } from './constants';

const defaultViewBox = '0 0 700 1100';

const initialState = {
  // Zoom animation
  viewBox: defaultViewBox,
  defaultViewBox,
  selectedPart: null,
};

export const SkeletonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skeletonReducer, initialState);

  // dispatch Fuctions
  const zoomArea = useCallback((x, y, width, height) => {
    dispatch({
      type: ZOOM_AREA,
      payload: { x, y, width, height },
    });
  }, []);

  const resetViewBox = useCallback(() => {
    dispatch({ type: RESET_VIEWBOX });
  }, []);

  const setPartName = useCallback((partName) => {
    dispatch({ type: SET_PART, payload: partName });
  }, []);

  const delPartName = useCallback(() => {
    dispatch({ type: DEL_PART });
  }, []);

  const circleFunctions = useCallback((partName) => {
    setPartName(partName);
  }, [setPartName]);

  const zoomToContent = useCallback((x, y, width, height) => {
    dispatch({ type: ZOOM_AREA, payload: { x, y, width, height } });
  }, []);

  const backBtnFunctions = useCallback(() => {
    resetViewBox();
    delPartName();
  }, [resetViewBox, delPartName]);

  return (
    <SkeletonContext.Provider
      value={{ ...state, circleFunctions, backBtnFunctions, zoomToContent }}
    >
      {children}
    </SkeletonContext.Provider>
  );
};