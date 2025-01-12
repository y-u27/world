"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type CountryContextType = {
  selectedCountry: string | null;
  setSelectedCountry: (country: string) => void;
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
