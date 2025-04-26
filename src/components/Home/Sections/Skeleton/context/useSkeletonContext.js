import { createContext, useContext } from 'react';

export const SkeletonContext = createContext();

export const useSkeletonContext = () => {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error('useSkeletonContext must be used within a SkeletonProvider');
  }
  return context;
};
