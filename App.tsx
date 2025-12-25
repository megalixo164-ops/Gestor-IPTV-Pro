import React, { useState, useEffect, useMemo } from 'react';
import { Tv, Plus, Search } from 'lucide-react';
import { Client } from './types';
import { calculateRenewalDate } from './services/clientService';
import StatsDashboard from './components/StatsDashboard';
import ClientCard from './components/ClientCard';
import ClientModal from './components/ClientModal';

const App: React.FC = () => {
    // Initialize state from local storage or empty array
    const [clients, setClients] = useState<Client[]>(() => {
        const saved = localStorage.getItem('iptv_clients');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Persist to local storage whenever clients change
    useEffect(() => {
        localStorage.setItem('iptv_clients', JSON.stringify(clients));
    }, [clients]);

    // Computed Statistics
    const stats = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let activeCount = 0;
        let expiredCount = 0;

        clients.forEach(c => {
            const [y, m, d] = c.dueDate.split('-').map(Number);
            const due = new Date(y, m - 1, d);
            due.setHours(0, 0, 0, 0);

            if (due < today) {
                expiredCount++;
            } else {
                activeCount++;
            }
        });

        return {
            total: clients.length,
            active: activeCount,
            expired: expiredCount
        };
    }, [clients]);

    // Filtered and Sorted List
    const filteredClients = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return clients
            .filter(c => c.name.toLowerCase().includes(lowerSearch))
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [clients, searchTerm]);

    // Handlers
    const handleAddClient = (newClientData: Omit<Client, 'id'>) => {
        const newClient: Client = {
            ...newClientData,
            id: Date.now()
        };
        setClients(prev => [...prev, newClient]);
        setIsModalOpen(false);
    };

    const handleDeleteClient = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            setClients(prev => prev.filter(c => c.id !== id));
        }
    };

    const handleRenewClient = (id: number) => {
        setClients(prev => prev.map(client => {
            if (client.id !== id) return client;
            
            const newDate = calculateRenewalDate(client.dueDate);
            return { ...client, dueDate: newDate };
        }));
        
        const client = clients.find(c => c.id === id);
        if (client) {
            alert(`Cliente ${client.name} renovado com sucesso!`);
        }
    };

    return (
        <div className="pb-20 max-w-md mx-auto min-h-screen bg-iptv-dark flex flex-col">
            {/* Header */}
            <header className="bg-iptv-card p-4 sticky top-0 z-40 shadow-xl border-b border-slate-700">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-iptv-primary flex items-center gap-2">
                        <Tv className="w-6 h-6" />
                        Gestor IPTV
                    </h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-iptv-primary hover:bg-iptv-primaryHover text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1 active:scale-95"
                    >
                        <Plus size={16} strokeWidth={3} />
                        Novo
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4 flex-1">
                <StatsDashboard 
                    total={stats.total} 
                    active={stats.active} 
                    expired={stats.expired} 
                />

                <div className="mb-6 relative group">
                    <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-iptv-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar cliente..." 
                        className="w-full bg-iptv-card border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-iptv-primary focus:ring-1 focus:ring-iptv-primary text-sm text-white placeholder-gray-500 transition-all shadow-sm"
                    />
                </div>

                <div className="space-y-4">
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => (
                            <ClientCard 
                                key={client.id} 
                                client={client} 
                                onDelete={handleDeleteClient}
                                onRenew={handleRenewClient}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 opacity-50">
                            <p className="text-gray-400">Nenhum cliente encontrado.</p>
                        </div>
                    )}
                </div>
            </main>

            <ClientModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleAddClient} 
            />
        </div>
    );
};

export default App;