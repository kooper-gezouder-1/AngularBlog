export class Post{
picture:string;
like:number=0;
	constructor(
		public title: string,
		public content: string,
		public Postdate:string
		){}
}