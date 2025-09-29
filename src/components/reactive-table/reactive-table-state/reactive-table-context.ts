import { createContext, type ActionDispatch } from "react";
import type { ReactiveTableContextType } from "../types";

export const ReactiveTableContext = createContext<ReactiveTableContextType | null>(null);

export const ReactiveTableDispatchContext = createContext<ActionDispatch<[action: any]> | null>(null);