import React, { ReactNode } from "react";

const MaxWithProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      {children}
    </div>
  );
};

export default MaxWithProvider;
