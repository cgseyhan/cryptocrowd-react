import React, { createContext, useContext } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

const LenisContext = createContext(null);

/** Hook to consume the shared Lenis instance. */
export function useLenisScroll() {
  return useContext(LenisContext);
}

/**
 * Wraps children that need access to the Lenis instance.
 * Must be placed inside <ReactLenis root> in App.jsx.
 */
export function LenisProvider({ children }) {
  const lenis = useLenis();
  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
