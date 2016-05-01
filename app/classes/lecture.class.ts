import {Module} from "./module.class";
export class Lecture {
    public idlecture: number;
    public starttime: string;
    public endtime: string;
    public day: number;
    public building: number;
    public room: string;
    public classname: string;
    public semester: string;
    public responsible: string;
    public module_idmodule: number;

    public starttime_hour: number;
    public starttime_minute: number;
    public endtime_hour: number;
    public endtime_minute: number;

    public module: Module; //optional, kann Module enthalten
    
    public toString = () : string => {
        return JSON.stringify(this);
    }
}