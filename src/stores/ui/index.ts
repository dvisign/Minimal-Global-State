// /src/stores/ui.ts

import {createAtom} from "@/lib/store/core/createAtom";
import {AlertState} from "./types";

export const isLoadingAtom = createAtom<boolean>(false);

export const alertAtom = createAtom<AlertState>({
  message: "",
  open: false,
});
