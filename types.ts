export interface Client {
    id: number;
    name: string;
    phone: string;
    dueDate: string; // ISO Date string YYYY-MM-DD
    plan: string;
}

export interface ClientStatus {
    label: string;
    color: string;
    borderColor: string;
    days: number;
    textColor: string;
}

export type StatType = 'total' | 'active' | 'expired';