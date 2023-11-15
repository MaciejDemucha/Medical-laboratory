export class ExaminationOffer {
    constructor(
        public id: number | null,
        public name: string,
        public description: string,
        public price: number
    ) {}

    equals(other: ExaminationOffer): boolean {
        
        return this.id === other.id && this.name === other.name
      }
}