export interface ITableHeader {
    text: string;
    value: string;
    format?: 'date' | 'currency'
}

export interface ITableFilter {
    [key: string]: string | number
}

export interface ITableSort {
    header: ITableHeader;
    direction: 'ASC' | 'DESC' | ''
}