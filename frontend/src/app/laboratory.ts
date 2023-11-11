import { Schedule } from "./schedule";

export class Laboratory{
    constructor(
        public id: number,
        public phone: string,
        public street: string,
        public postalCode: string,
        public city: string,
        public schedule: Schedule[]
        
    )
    {
    
    }

}