import React from 'react';
import { Client } from '../types';
import { getStatusInfo } from '../services/clientService';
import { MessageCircle, RefreshCw, Trash2 } from 'lucide-react';

interface ClientCardProps {
    client: Client;
    onRenew: (id: number) => void;
    onDelete: (id: number) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onRenew, onDelete }) => {
    const status = getStatusInfo(client.dueDate);
    // Fix date display to avoid timezone shifts visually
    const [year, month, day] = client.dueDate.split('-').map(Number);
    const displayDate = new Date(year, month - 1, day).toLocaleDateString('pt-BR');

    const handleWhatsApp = () => {
        const message = `Olá ${client.name}, sua assinatura vence dia ${displayDate}.`;
        const url = `https://wa.me/${client.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className={`bg-iptv-card rounded-xl p-4 shadow-lg border-l-4 ${status.borderColor} flex flex-col gap-3 transition-all hover:bg-slate-800`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-white truncate max-w-[150px] sm:max-w-[200px]">{client.name}</h3>
                    <p className="text-sm text-gray-400 truncate max-w-[150px]">{client.plan}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-opacity-20 bg-gray-700 whitespace-nowrap ${status.textColor}`}>
                    {status.label} ({status.days > 0 ? '+' : ''}{status.days} dias)
                </span>
            </div>
            
            <div className="flex justify-between items-center bg-gray-900 bg-opacity-50 p-2 rounded-lg border border-slate-700/50">
                <span className="text-xs text-gray-400">Vencimento:</span>
                <span className="font-mono text-sm font-bold text-white">{displayDate}</span>
            </div>

            <div className="flex gap-2 mt-1">
                <button 
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-600 text-white flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition active:scale-95"
                >
                    <MessageCircle size={16} />
                    <span>Cobrar</span>
                </button>
                <button 
                    onClick={() => onRenew(client.id)}
                    className="flex-1 bg-iptv-primary text-white flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold hover:bg-iptv-primaryHover transition active:scale-95"
                >
                    <RefreshCw size={16} />
                    <span>Renovar</span>
                </button>
                <button 
                    onClick={() => onDelete(client.id)}
                    className="px-3 bg-red-500 bg-opacity-20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition active:scale-95 flex items-center justify-center"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default ClientCard;