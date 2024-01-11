import { store } from "@/containers/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type ProvidersProps = {
  children: ReactNode;
};
function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
