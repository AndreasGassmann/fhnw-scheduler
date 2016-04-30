export class Task {
    public idtask: number;
    public title: string;
    public description: string;
    public due: string;
    public mandatory: boolean;
    public lecture_idlecture: number;

    public toString = () : string => {
        return JSON.stringify(this);
    }
}