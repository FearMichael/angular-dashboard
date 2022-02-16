export interface ITableHeader {
    text: string;
    value: string;
    format?: 'date' | 'currency'
    editable?: boolean;
}

export interface ITableFilter {
    [key: string]: string | number
};

export interface ITableSort {
    header: ITableHeader;
    direction: 'ASC' | 'DESC' | ''
};

export interface IFilterEvent {
    [key: string]: string | number
};

export interface IDateFilterEvent {
    [key: string]: {
        startDate: Date,
        endDate: Date
    }
};