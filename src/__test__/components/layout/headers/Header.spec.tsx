import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../../../../components/layout/headers/Header";
import { renderWithProviders } from "../../../utils/test-utils";

describe("Header 컴포넌트", () => {
  describe("네비게이션", () => {
    it("모든 네비게이션 링크를 렌더링해야 한다", () => {
      renderWithProviders(<Header />);

      expect(screen.getByText("회사소개")).toBeInTheDocument();
      expect(screen.getByText("문화")).toBeInTheDocument();
      expect(screen.getByText("채용")).toBeInTheDocument();
    });

    it("활성화된 링크에 올바른 스타일이 적용되어야 한다", async () => {
      renderWithProviders(<Header />);

      const companyLink = screen.getByText("회사소개");
      await userEvent.click(companyLink);

      expect(companyLink).toHaveClass("text-primary");
    });
  });

  describe("로고", () => {
    it("메디스트림 로고를 렌더링해야 한다", () => {
      renderWithProviders(<Header />);

      const logo = screen.getByAltText("Medistream");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "./logo.webp");
    });
  });
});
