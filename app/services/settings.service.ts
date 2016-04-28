import {Injectable} from 'angular2/core';

@Injectable()
export class SettingsService {

    constructor() {
    }

    getSettings() {
        return {
            getNotificationsBeforeLectures: false,
            getNotificationsBeforeTasks: false
        };
    }
}