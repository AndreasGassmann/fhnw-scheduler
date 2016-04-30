export class Lecture {
    public idlecture: number;
    public starttime: string;
    public endtime: string;
    public building: number;
    public room: string;
    public classname: string;
    public responsible: string;
    public moduleId: number;

    public toString = () : string => {
        return JSON.stringify(this);
    }
}