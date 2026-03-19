import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  ShieldAlert,
  FileText,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceArea,
  Label
} from 'recharts';
import { motion } from 'motion/react';

// Mock data for FRP-Br (Demand vs Control)
const frpData = [
  { name: 'Telemarketing', demand: 85, control: 15, z: 50 },
  { name: 'Administrativo', demand: 40, control: 60, z: 10 },
  { name: 'TI', demand: 55, control: 75, z: 15 },
];

const ActionPlan = [
  { 
    id: 'AP-001', 
    hazard: 'Exigência de produtividade (Metas)', 
    risk: 'Sobrecarga mental / Burnout', 
    action: 'Revisão das metas com base em análise ergonômica (NR-17)', 
    priority: 'Crítica',
    status: 'Em Planejamento'
  },
  { 
    id: 'AP-002', 
    hazard: 'Baixa autonomia (Pausas)', 
    risk: 'Dano moral / Estresse agudo', 
    action: 'Implementação de pausas flexíveis conforme Anexo II da NR-17', 
    priority: 'Crítica',
    status: 'Imediato'
  },
  { 
    id: 'AP-003', 
    hazard: 'Clima Organizacional', 
    risk: 'Alta rotatividade (Turnover)', 
    action: 'Programa de apoio social e treinamento de liderança positiva', 
    priority: 'Alta',
    status: 'Agendado'
  }
];

export default function App() {
  const [selectedSector] = useState('Telemarketing');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" id="sst-pro-root">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 shadow-lg border-b border-slate-800" id="main-header">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SST Pro</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Auditoria de Riscos Psicossociais</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Compliance NR-01 / NR-17
            </span>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Auditor Responsável</p>
              <p className="text-sm">Sênior SST / Compliance</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8" id="dashboard-content">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="stats-grid">
          <StatsCard 
            id="stat-employees"
            title="Funcionários" 
            value="50" 
            icon={<Users className="w-5 h-5" />} 
            color="bg-blue-500" 
          />
          <StatsCard 
            id="stat-turnover"
            title="Turnover Mensal" 
            value="30%" 
            icon={<TrendingUp className="w-5 h-5" />} 
            color="bg-red-500" 
            trend="Acima do limite técnico"
          />
          <StatsCard 
            id="stat-autonomy"
            title="Nível de Controle" 
            value="Baixo" 
            icon={<Clock className="w-5 h-5" />} 
            color="bg-orange-500" 
          />
          <StatsCard 
            id="stat-risk"
            title="Risco PGR" 
            value="Crítico" 
            icon={<AlertTriangle className="w-5 h-5" />} 
            color="bg-red-600" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FRP-Br Matrix (Karasek Model) */}
          <section className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200" id="matrix-section">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  Matriz de Karasek (FRP-Br)
                </h2>
                <p className="text-sm text-slate-500">Cruzamento de Demanda Psicológica vs. Controle sobre o Trabalho</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Alta Tensão</span>
              </div>
            </div>

            <div className="h-[400px] w-full" id="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                  <XAxis type="number" dataKey="control" name="Controle" unit="%" domain={[0, 100]}>
                    <Label value="Controle / Autonomia" offset={-20} position="insideBottom" />
                  </XAxis>
                  <YAxis type="number" dataKey="demand" name="Demanda" unit="%" domain={[0, 100]}>
                    <Label value="Demanda Psicológica" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  {/* Quadrants */}
                  {React.createElement(ReferenceArea as any, { x1: 0, x2: 50, y1: 50, y2: 100, fill: "#fee2e2", fillOpacity: 0.5 })}
                  {React.createElement(ReferenceArea as any, { x1: 50, x2: 100, y1: 50, y2: 100, fill: "#fef3c7", fillOpacity: 0.5 })}
                  {React.createElement(ReferenceArea as any, { x1: 0, x2: 50, y1: 0, y2: 50, fill: "#f1f5f9", fillOpacity: 0.5 })}
                  {React.createElement(ReferenceArea as any, { x1: 50, x2: 100, y1: 0, y2: 50, fill: "#ecfdf5", fillOpacity: 0.5 })}
                  

                  
                  <Scatter name="Setores" data={frpData} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-start" id="matrix-info">
              <Info className="w-5 h-5 text-slate-400 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Diagnóstico Técnico:</strong> O setor de {selectedSector} está posicionado no quadrante de <span className="text-red-600 font-bold">Alta Tensão</span>. 
                Cientificamente, esta combinação é a maior preditora de adoecimento mental e cardiovascular. 
                No PGR, isso exige medidas de controle de nível 1 (Eliminação/Substituição da fonte do estresse).
              </p>
            </div>
          </section>

          {/* Sidebar: Risk Summary */}
          <section className="space-y-6" id="sidebar-section">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">Análise de Passivo</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <p className="text-sm leading-snug">Controle de pausas fisiológicas gera jurisprudência de <strong>Dano Moral Presumido</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <p className="text-sm leading-snug">Turnover de 30% indica <strong>ineficiência operacional</strong> e risco de Nexo Técnico Epidemiológico (NTEP).</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                  <p className="text-sm leading-snug text-slate-300 italic">"A gestão do risco é a melhor defesa jurídica. Omitir o risco é assumir a culpa."</p>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all flex justify-center items-center gap-2 group">
                Gerar Relatório PGR <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Matriz de Risco PGR
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm">Severidade</span>
                  <span className="font-bold text-red-600">4 - Severa</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm">Probabilidade</span>
                  <span className="font-bold text-orange-600">3 - Provável</span>
                </div>
                <div className="p-3 bg-red-600 text-white rounded-lg text-center font-bold">
                  NÍVEL DE RISCO: MUITO ALTO
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Action Plan Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" id="action-plan-section">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Plano de Ação (Defesa Estratégica)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Perigo / Risco</th>
                  <th className="px-6 py-4 font-semibold">Medida de Prevenção</th>
                  <th className="px-6 py-4 font-semibold">Prioridade</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {ActionPlan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{item.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{item.hazard}</p>
                      <p className="text-xs text-slate-500">{item.risk}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.action}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        item.priority === 'Crítica' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'Imediato' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                        }`}></div>
                        {item.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto p-6 text-center text-slate-400 text-xs border-t border-slate-200 mt-12 mb-6">
        <p>© 2026 SST Pro - Metodologia FRP-Br Integrada. Todos os direitos reservados.</p>
        <p className="mt-1">Relatório gerado em conformidade com a Portaria MTE nº 1.41G/2024.</p>
      </footer>
    </div>
  );
}

function StatsCard({ id, title, value, icon, color, trend }: { id: string, title: string, value: string, icon: React.ReactNode, color: string, trend?: string }) {
  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 text-sm font-medium">{title}</span>
        <div className={`${color} p-2 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
      <div>
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {trend && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase">{trend}</p>}
      </div>
    </motion.div>
  );
}
