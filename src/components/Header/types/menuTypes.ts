export interface IMenuItem{
    item:{label: string, route?: string},
    nodes: IMenuItem[],
    deep: number
}