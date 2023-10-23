export class Examination {
    constructor(
        public id: number,
        public name: string,
        public number: string|null,
        public datePerformed: string|null
    ) {}
}