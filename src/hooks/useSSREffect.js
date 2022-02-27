import { useLayoutEffect, useEffect } from 'react';

const useSSREffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export { useSSREffect as useLayoutEffect };
