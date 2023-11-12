export class Schedule{
    constructor(
        public id: number,
        public day: string,
        public openingTime: string,
        public closingTime: string
        
    )
    {
    
    }

    public toString (): string {
        return `${this.day}: ${this.openingTime}-${this.closingTime}`;
    }

    

}