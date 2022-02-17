export interface IDashboardTableData {
    id: number;
    title: string;
    division: string;
    project_owner: string;
    budget: number;
    status: string;
    created: string;
    modified: string | null;
}

export interface IDashboardSummaryData {
    id: number;
    budget: number;
    status: string;
    highBudget: string;
    lowBudget: string;
}