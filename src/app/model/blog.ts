export class Blog {
    _id!:string; 
    companyName!:string;
    category!:string;
    campus!:string;
    round!:string;
    description!:string;
    Cdate!:string;
    writer!:string;
    linkedIn!:string;
    __v!:number;
    likes!:number;
    likesArray!:string[];
    views!:number;
    constructor(){
        // this.Cdate=(new Date()).toLocaleDateString('en-GB');
    }
}
