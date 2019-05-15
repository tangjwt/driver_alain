export class Utils {

    public static toArray(str:string,split:string=','):Array<any>{
        return str.split(split).map((value) => value.trim())
    }
   
}
