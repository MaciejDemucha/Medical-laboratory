export class ExaminationOffer {
    constructor(
        public id: number | null,
        public name: string,
        public description: string,
        public price: number
    ) {}
}