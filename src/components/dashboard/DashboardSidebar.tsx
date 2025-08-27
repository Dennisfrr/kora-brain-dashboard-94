
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  Brain, 
  Database, 
  Settings, 
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: BarChart3 },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
  { name: 'Base de Conhecimento', href: '/dashboard/knowledge', icon: Database },
  { name: 'Configurações', href: '/dashboard/config', icon: Settings },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col">
      <div className="p-6 border-b border-slate-200/60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Kora Brain
            </h1>
            <p className="text-sm text-slate-500">Dashboard IA</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/60">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-900">Sistema Ativo</span>
          </div>
          <p className="text-xs text-green-700">
            Agente funcionando perfeitamente
          </p>
        </div>
      </div>
    </div>
  );
};
