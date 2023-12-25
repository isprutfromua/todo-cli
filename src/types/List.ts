export interface IList {
    add(args: any): boolean

    delete(id: number): boolean

    edit(id: number, args: any): Promise<boolean>

    getInfo(id: number): string

    getAllData(): any[]

    getEntries(): IterableIterator<[number, any]>
}