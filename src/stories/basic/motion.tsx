import {createContext, useContext, useEffect, useState} from 'react';
export const MotionContext = createContext(true);
export function useMotion() {
  const enabled = useContext(MotionContext);
  const [reduced, setReduced] = useState(()=>typeof window!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return enabled && !reduced;
}
