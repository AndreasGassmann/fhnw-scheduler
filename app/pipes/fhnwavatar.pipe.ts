import {Pipe} from 'angular2/core';

@Pipe({name: 'avatar'})
export class AvatarPipe{
    transform(responsible: string): string {
        if(!responsible){
            return "http://www.virtuellefabrik.ch/Portals/0/DNNGo_PhotoAlbums/455/20/fhnw.jpg";
        }
        var name = responsible.replace(/ä/g, 'ae');
        name = name.replace(/ö/g, 'oe');
        name = name.replace(/ü/g, 'ue');
        var newString = "";
        name.split(" ").forEach((n) => {newString += n + "-"});
        var finalName = newString.substr(0, newString.length -1).toLowerCase();

        console.log("http://www.fhnw.ch/personen/" + finalName + "/foto/" + finalName +".jpg");

        //i.e. "http://www.fhnw.ch/personen/christoph-denzler/foto/christoph-denzler.jpg"
        return "http://www.fhnw.ch/personen/" + finalName + "/foto/" + finalName +".jpg";
    }
}