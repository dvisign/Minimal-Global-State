import { http, HttpResponse } from "msw";

// 예시 API 응답 데이터
const mockCompanyInfo = {
  name: "Medistream",
  description: "메디스트림은 의료 IT 솔루션을 제공하는 기업입니다.",
  employees: 100,
  location: "서울시 강남구",
};

export const handlers = [
  // 회사 정보 API
  http.get("/api/company", () => {
    return HttpResponse.json(mockCompanyInfo);
  }),

  // 채용 공고 API
  http.get("/api/jobs", () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "프론트엔드 개발자",
        department: "개발팀",
        location: "서울",
        type: "정규직",
      },
      {
        id: 2,
        title: "백엔드 개발자",
        department: "개발팀",
        location: "서울",
        type: "정규직",
      },
    ]);
  }),
];
