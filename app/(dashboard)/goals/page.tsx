'use client';

import { useState, useEffect } from 'react';
import { Target, Plus, Zap, Rocket, ChevronRight } from 'lucide-react';

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Inisiasi Target Baru
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  // State Alokasi Dana (Top Up)
  const [topUpAmount, setTopUpAmount] = useState<{ [key: string]: string }>({});
  const [isToppingUp, setIsToppingUp] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetchAPI('/goals');
      setGoals(res.data! || []);
    } catch (error) {
      console.error('Galat menarik data proyeksi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTambahTabungan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName || !newGoalTarget) return alert('Parameter nama dan target nominal wajib diisi!');

    setIsAddingGoal(true);
    try {
      await fetchAPI('/goals', {
        method: 'POST',
        body: JSON.stringify({ name: newGoalName, targetAmount: Number(newGoalTarget) })
      });
      setNewGoalName('');
      setNewGoalTarget('');
      await fetchGoals();
    } catch (error: any) {
      alert(`Gagal menginisiasi target: ${error.message}`);
    } finally {
      setIsAddingGoal(false);
    }
  };

  const handleTopUpTabungan = async (goalId: string, currentAmount: number) => {
    const amountToAdd = Number(topUpAmount[goalId]);
    if (!amountToAdd || amountToAdd <= 0) return alert('Masukkan nominal alokasi yang valid!');

    setIsToppingUp(prev => ({ ...prev, [goalId]: true }));
    try {
      await fetchAPI(`/goals/${goalId}`, {
        method: 'PATCH',
        body: JSON.stringify({ currentAmount: currentAmount + amountToAdd })
      });
      setTopUpAmount(prev => ({ ...prev, [goalId]: '' }));
      await fetchGoals();
    } catch (error: any) {
      alert(`Gagal mengalokasikan dana: ${error.message}`);
    } finally {
      setIsToppingUp(prev => ({ ...prev, [goalId]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#536DFE]/20 border-t-[#536DFE] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
      
      {/* HEADER SECTION */}
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Target className="text-[#536DFE]" size={28} />
            Proyeksi Finansial
          </h1>
          <p className="text-[#94A3B8] text-sm mt-2 font-medium tracking-wide">
            Fokuskan aset Anda pada target terukur.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* KOLOM KIRI: Form Inisiasi Target (Glassmorphic Panel) */}
        <div className="bg-[#0A1428]/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#536DFE]/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <h2 className="text-sm font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
            <Rocket size={16} className="text-[#00E5FF]" /> Kunci Target Baru
          </h2>
          
          <form onSubmit={handleTambahTabungan} className="flex flex-col gap-6 relative z-10">
            <div>
              <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Identitas Proyeksi</label>
              <input 
                type="text" 
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                className="w-full bg-[#040B16] border border-white/5 p-4 rounded-2xl text-sm text-white focus:border-[#536DFE] outline-none transition-all shadow-inner placeholder:text-white/20"
                placeholder="Misal: Dana Darurat, MacBook M4..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Kebutuhan Aset (Rp)</label>
              <input 
                type="number" 
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                className="w-full bg-[#040B16] border border-white/5 p-4 rounded-2xl text-lg font-mono font-bold text-white focus:border-[#536DFE] outline-none transition-all shadow-inner placeholder:text-white/20 tracking-tighter"
                placeholder="0"
              />
            </div>

            <button 
              type="submit" 
              disabled={isAddingGoal}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2962FF] to-[#536DFE] hover:from-[#536DFE] hover:to-[#2962FF] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_0_15px_rgba(83,109,254,0.3)] mt-2"
            >
              {isAddingGoal ? <Zap size={18} className="animate-spin" /> : <><Plus size={18} /> Inisiasi Proyeksi</>}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: Daftar Proyeksi (Span 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {goals.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2rem] text-[#94A3B8]">
              <Target size={32} className="opacity-50 mb-2" />
              <p className="text-xs font-bold tracking-widest uppercase opacity-50">Tidak Ada Proyeksi Aktif</p>
            </div>
          ) : (
            goals.map((goal) => {
              const progressPercentage = goal.targetAmount > 0 
                ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100) 
                : 0;

              return (
                <div key={goal.id} className="bg-gradient-to-b from-[#0A1428] to-[#040B16] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-xl group hover:border-[#00E5FF]/20 transition-all duration-300 relative overflow-hidden">
                  
                  {/* Glowing Progress Background (Subtle) */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#00E5FF]/[0.02] transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{goal.name}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-[#00E5FF] font-black font-mono tracking-tighter">Rp {goal.currentAmount.toLocaleString('id-ID')}</span>
                          <span className="text-xs text-[#94A3B8] font-mono uppercase tracking-widest">/ Rp {goal.targetAmount.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-[#94A3B8]">
                          {progressPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar (Laser UI) */}
                    <div className="w-full bg-[#040B16] rounded-full h-1.5 mb-6 overflow-hidden shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-[#2962FF] to-[#00E5FF] h-full rounded-full transition-all duration-1000 ease-out relative" 
                        style={{ width: `${progressPercentage}%` }}
                      >
                        {/* Glow effect at the tip */}
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#00E5FF]"></div>
                      </div>
                    </div>

                    {/* Input Alokasi Dana (Top Up) */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <input 
                        type="number" 
                        value={topUpAmount[goal.id] || ''}
                        onChange={(e) => setTopUpAmount(prev => ({ ...prev, [goal.id]: e.target.value }))}
                        className="flex-1 bg-[#040B16] border border-white/5 p-3 rounded-xl text-sm font-mono text-white focus:border-[#00E5FF] outline-none transition-all placeholder:text-[#94A3B8]/30"
                        placeholder="Alokasikan aset (Rp)"
                      />
                      <button 
                        onClick={() => handleTopUpTabungan(goal.id, goal.currentAmount)}
                        disabled={isToppingUp[goal.id]}
                        className="bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] disabled:text-[#94A3B8] disabled:bg-transparent border border-[#00E5FF]/20 font-bold px-5 py-3 rounded-xl transition-all text-xs tracking-widest uppercase flex items-center gap-2"
                      >
                        {isToppingUp[goal.id] ? '...' : <><ChevronRight size={16} /> Transfer</>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

function fetchAPI(arg0: string) {
  throw new Error('Function not implemented.');
}
