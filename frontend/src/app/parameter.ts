import { NormRange } from "./normRange";

export class Parameter {
    constructor(
        public id: number,
        public name: string,
        public value: number|null,
        public norm: NormRange|null
    ) {}
}