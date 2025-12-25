import React from 'react';

interface StatsDashboardProps {
    total: number;
    active: number;
    expired: number;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ total, active, expired }) => {
    return (
        <div className="grid grid-cols-3 gap-2 text-center mt-2 mb-4">
            <div className="bg-iptv-card p-3 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
                <p className="text-xl font-bold text-white">{total}</p>
            </div>
            <div className="bg-iptv-card p-3 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-iptv-success uppercase tracking-wider">Ativos</p>
                <p className="text-xl font-bold text-iptv-success">{active}</p>
            </div>
            <div className="bg-iptv-card p-3 rounded-xl border border-slate-700 shadow-sm">
                <p className="text-xs text-iptv-danger uppercase tracking-wider">Vencidos</p>
                <p className="text-xl font-bold text-iptv-danger">{expired}</p>
            </div>
        </div>
    );
};

export default StatsDashboard;