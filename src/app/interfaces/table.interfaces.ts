type StringKeys<K> = Extract<keyof K, string>;

export interface ITableHeader<T> {
    text: string;
    value: StringKeys<T>;
    format?: 'date' | 'currency'
    editable?: boolean;
    route?: boolean;
}

export interface ITableFilter {
    [key: string]: string | number
};

export interface ITableSort<T> {
    header: ITableHeader<T>;
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

export interface ITableConfig {
    disableActions?: boolean;
    disableFilters?: boolean;
    disableExport?: boolean;
    linkRoute?: string;
}