export class Examination {
    constructor(
        public id: number,
        public patientId: number|null,
        public name: string,
        public number: string|null,
        public datePerformed: string|null
    ) {}
}