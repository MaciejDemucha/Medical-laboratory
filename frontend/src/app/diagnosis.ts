export class Diagnosis {
    constructor(
        public id: number | null,
        public examinationId: number,
        public description: string,
    ) {}
}