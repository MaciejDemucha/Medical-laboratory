export class Patient{
    constructor(
        public id: number | null,
        public pesel: string,
        public firstName: string,
        public lastName: string,
        public birthDate: string
    )
    {
    
    }

}