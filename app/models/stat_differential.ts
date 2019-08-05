import { StatDocument } from "./stat";

export interface StatDifferential {
    stat: StatDocument;
    difference: number;
} 