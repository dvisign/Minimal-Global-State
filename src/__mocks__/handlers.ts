import {http, HttpResponse} from "msw";

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
  // Todo LIST API
  http.get("/api/todo-list", () => {
    const existingData = JSON.parse(localStorage.getItem("database") || "[]");

    return HttpResponse.json(existingData, {status: 200});
  }),
  // Todo CREATE API
  http.post("/api/create-todo", async ({request}) => {
    const body = (await request.json()) as {todoItem: string};
    const existingData = JSON.parse(localStorage.getItem("database") || "[]");

    const newItem = {
      id: Date.now(),
      description: body.todoItem,
      completed: false,
    };

    const updated = [...existingData, newItem];
    localStorage.setItem("database", JSON.stringify(updated));

    return HttpResponse.json(newItem, {status: 201});
  }),
  // Todo UPDATE API
  http.post("/api/update-todo/:id", async ({params, request}) => {
    const {id} = params;
    const body = (await request.json()) as {description: string};

    if (!body?.description) {
      return HttpResponse.json({error: "Invalid body"}, {status: 400});
    }

    const db: {id: number; description: string; completed: boolean}[] =
      JSON.parse(localStorage.getItem("database") || "[]");

    const updated = db.map((todo) =>
      todo.id === Number(id) ? {...todo, description: body.description} : todo
    );

    localStorage.setItem("database", JSON.stringify(updated));
    return HttpResponse.json({success: true});
  }),
  // Todo COMPLETE API
  http.post("/api/complete-todo/:id", async ({params}) => {
    const {id} = params;
    const db = JSON.parse(localStorage.getItem("database") || "[]");

    const updated = db.map((todo: any) =>
      todo.id === Number(id)
        ? {
            ...todo,
            completed: true,
            completedAt: new Date().toISOString(), // 완료 시간 저장
          }
        : todo
    );

    localStorage.setItem("database", JSON.stringify(updated));

    return HttpResponse.json({success: true});
  }),
];
