import { Client, ClientStatus } from '../types';

export const getStatusInfo = (dueDate: string): ClientStatus => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Parse the YYYY-MM-DD string explicitly to avoid timezone issues
    const [year, month, day] = dueDate.split('-').map(Number);
    const due = new Date(year, month - 1, day);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { 
            label: 'VENCIDO', 
            color: 'bg-iptv-danger', 
            borderColor: 'border-iptv-danger',
            textColor: 'text-iptv-danger',
            days: diffDays 
        };
    }
    if (diffDays === 0) {
        return { 
            label: 'VENCE HOJE', 
            color: 'bg-iptv-warning', 
            borderColor: 'border-iptv-warning',
            textColor: 'text-iptv-warning',
            days: diffDays 
        };
    }
    if (diffDays <= 3) {
        return { 
            label: 'VENCENDO', 
            color: 'bg-iptv-warning', 
            borderColor: 'border-iptv-warning',
            textColor: 'text-iptv-warning',
            days: diffDays 
        };
    }
    return { 
        label: 'ATIVO', 
        color: 'bg-iptv-success', 
        borderColor: 'border-iptv-success',
        textColor: 'text-iptv-success',
        days: diffDays 
    };
};

export const calculateRenewalDate = (currentDueDate: string): string => {
    let baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);

    const [year, month, day] = currentDueDate.split('-').map(Number);
    const currentDue = new Date(year, month - 1, day);
    currentDue.setHours(0, 0, 0, 0);
    
    // If subscription is still active (in the future), add to the end of it
    if (currentDue > baseDate) {
        baseDate = currentDue;
    }
    
    // Add 30 days
    baseDate.setDate(baseDate.getDate() + 30);
    
    // Format back to YYYY-MM-DD
    const y = baseDate.getFullYear();
    const m = String(baseDate.getMonth() + 1).padStart(2, '0');
    const d = String(baseDate.getDate()).padStart(2, '0');
    
    return `${y}-${m}-${d}`;
};