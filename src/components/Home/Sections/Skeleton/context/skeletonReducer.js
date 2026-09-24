import { ZOOM_AREA, RESET_VIEWBOX, SET_PART, DEL_PART } from './constants';

export const skeletonReducer = (state, action) => {
  switch (action.type) {
    case ZOOM_AREA: {
      const { x, y, width, height } = action.payload;
      return {
        ...state,
        viewBox: `${x} ${y} ${width} ${height}`,
      };
    }

    case RESET_VIEWBOX:
      return {
        ...state,
        viewBox: state.defaultViewBox,
      };

    case SET_PART:
      return {
        ...state,
        selectedPart: action.payload,
      };

    case DEL_PART:
      return {
        ...state,
        selectedPart: null,
      };

    default:
      return state;
  }
};
