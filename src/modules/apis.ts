import axios from "axios";
import {set} from "@/lib/store/core/setter";
import {isLoadingAtom, alertAtom} from "@/stores/ui";

const defaultApiModules = axios.create({
  baseURL: "/api",
  timeout: 3000,
});

// 요청 인터셉터 → 로딩 시작
defaultApiModules.interceptors.request.use((config) => {
  set(isLoadingAtom, true);
  return config;
});

// 응답 인터셉터 → 로딩 종료 + 에러 처리
defaultApiModules.interceptors.response.use(
  (response) => {
    set(isLoadingAtom, false);
    return response;
  },
  (error) => {
    set(isLoadingAtom, false);

    // 에러 메시지를 alertAtom에 전달
    set(alertAtom, {
      message:
        error?.response?.data?.message || "예상치 못한 오류가 발생했습니다.",
      open: true,
    });

    return Promise.reject(error);
  }
);

export default defaultApiModules;
