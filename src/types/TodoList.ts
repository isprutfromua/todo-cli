import {IStats} from "./Stats";
import {IList} from "./List";

export interface ITodoList extends IList {
    markAsComplete(id: number): boolean

    getNotesInfo(): IStats
}