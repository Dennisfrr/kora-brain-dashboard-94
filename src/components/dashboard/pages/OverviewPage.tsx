
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Brain,
  Target,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Chart } from '@/components/dashboard/Chart';

const fetchOverviewData = async () => {
  const response = await fetch('http://localhost:3005/api/analytics/overview');
  if (!response.ok) throw new Error('Erro ao buscar dados');
  return response.json();
};

const fetchKnowledgeStats = async () => {
  const response = await fetch('http://localhost:3005/api/knowledgebase/stats');
  if (!response.ok) throw new Error('Erro ao buscar stats da base');
  return response.json();
};

export const OverviewPage = () => {
  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['overview'],
    queryFn: fetchOverviewData,
  });

  const { data: knowledgeStats, isLoading: knowledgeLoading } = useQuery({
    queryKey: ['knowledge-stats'],
    queryFn: fetchKnowledgeStats,
  });

  if (overviewLoading || knowledgeLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: 'Total de Reflexões',
      value: overview?.totalReflections || 0,
      icon: Brain,
      change: '+12%',
      changeType: 'positive' as const,
      description: 'Análises de IA realizadas'
    },
    {
      title: 'Leads Ativos',
      value: overview?.activeLeads || 0,
      icon: Users,
      change: '+8%',
      changeType: 'positive' as const,
      description: 'Leads em conversação'
    },
    {
      title: 'Reuniões Agendadas',
      value: overview?.meetingsScheduled || 0,
      icon: Calendar,
      change: '+15%',
      changeType: 'positive' as const,
      description: 'Conversões para reunião'
    },
    {
      title: 'Taxa de Sucesso',
      value: `${overview?.averagePlanSuccessRate || 0}%`,
      icon: Target,
      change: '+5%',
      changeType: 'positive' as const,
      description: 'Média de planos bem-sucedidos'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Gráficos e Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Performance do Agente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart type="line" />
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle>Status da Base de Conhecimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Dores Comuns</span>
                <Badge variant="secondary">{knowledgeStats?.commonPains || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Soluções</span>
                <Badge variant="secondary">{knowledgeStats?.solutionsOffered || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Objeções</span>
                <Badge variant="secondary">{knowledgeStats?.commonObjections || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Provas Sociais</span>
                <Badge variant="secondary">{knowledgeStats?.socialProofs || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atividade Recente */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Atividade Recente do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50/60 rounded-lg border border-green-200/60">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  Plano "LeadQualificationToMeeting" executado com sucesso
                </p>
                <p className="text-xs text-green-700">há 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50/60 rounded-lg border border-blue-200/60">
              <Brain className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  Nova reflexão de IA processada para Lead #1234
                </p>
                <p className="text-xs text-blue-700">há 5 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-amber-50/60 rounded-lg border border-amber-200/60">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900">
                  Taxa de sucesso do plano "ColdLeadReEngagement" abaixo da média
                </p>
                <p className="text-xs text-amber-700">há 15 minutos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
