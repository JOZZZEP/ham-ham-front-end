import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface ScrollContextType {
  scrollPositions: Record<string, number>;
  setScrollPosition: (path: string, position: number ) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollPositions: {},
  setScrollPosition: () => {},
});

export const ScrollContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [scrollPositions, setScrollPositions ] = useState<Record<string, number>>({});

  const setScrollPosition = (path: string, position: number) => {
    setScrollPositions(prevState => ({
      ...prevState,
      [path]: position,
    }));
  };

  return (
    <ScrollContext.Provider value={{ scrollPositions, setScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);
