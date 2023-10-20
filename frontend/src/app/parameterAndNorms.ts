import { NormRange } from "./normRange";

export class ParameterWithNorm {
    constructor(
        public id: number,
        public name: string,
        public value: number|null,
        public normId: number,
        public unit: string,
        public min: number|null,
        public max: number|null
    ) {}
}