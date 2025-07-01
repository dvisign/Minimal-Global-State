import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";

export function renderWithProviders(ui: ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  });
}
