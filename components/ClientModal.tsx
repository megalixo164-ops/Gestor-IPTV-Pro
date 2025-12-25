import React, { useState, useEffect } from 'react';
import { Client } from '../types';
import { X } from 'lucide-react';

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (client: Omit<Client, 'id'>) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [plan, setPlan] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Set default date to today
            const today = new Date();
            const y = today.getFullYear();
            const m = String(today.getMonth() + 1).padStart(2, '0');
            const d = String(today.getDate()).padStart(2, '0');
            setDueDate(`${y}-${m}-${d}`);
            
            // Clear other fields
            setName('');
            setPhone('');
            setPlan('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, phone, dueDate, plan });
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-iptv-card w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-700 relative">
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
                >
                    <X size={20} />
                </button>
                
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    Novo Cliente
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Nome do Cliente</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-iptv-primary focus:ring-1 focus:ring-iptv-primary outline-none transition"
                            placeholder="Ex: João Silva"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">WhatsApp (apenas números)</label>
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-iptv-primary focus:ring-1 focus:ring-iptv-primary outline-none transition"
                            placeholder="5511999999999"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Data de Vencimento</label>
                        <input 
                            type="date" 
                            required
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-iptv-primary focus:ring-1 focus:ring-iptv-primary outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Plano / Notas</label>
                        <input 
                            type="text" 
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-iptv-primary focus:ring-1 focus:ring-iptv-primary outline-none transition"
                            placeholder="Ex: Mensal 4K"
                        />
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 py-3 bg-slate-700 text-gray-200 rounded-xl hover:bg-slate-600 transition font-medium"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-3 bg-iptv-primary text-white rounded-xl font-bold hover:bg-iptv-primaryHover transition shadow-lg shadow-indigo-500/20"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientModal;