
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Chart } from '@/components/dashboard/Chart';
import { 
  TrendingUp, 
  Target, 
  Heart, 
  Wrench,
  BarChart3
} from 'lucide-react';

const fetchSentimentData = async () => {
  const response = await fetch('http://localhost:3005/api/analytics/sentiment-distribution');
  if (!response.ok) throw new Error('Erro ao buscar dados de sentiment');
  return response.json();
};

const fetchToolUsage = async () => {
  const response = await fetch('http://localhost:3005/api/analytics/tool-usage');
  if (!response.ok) throw new Error('Erro ao buscar uso de ferramentas');
  return response.json();
};

const fetchPlanSuccess = async () => {
  const response = await fetch('http://localhost:3005/api/analytics/plan-success');
  if (!response.ok) throw new Error('Erro ao buscar sucesso de planos');
  return response.json();
};

export const AnalyticsPage = () => {
  const { data: sentimentData, isLoading: sentimentLoading } = useQuery({
    queryKey: ['sentiment'],
    queryFn: fetchSentimentData,
  });

  const { data: toolData, isLoading: toolLoading } = useQuery({
    queryKey: ['tool-usage'],
    queryFn: fetchToolUsage,
  });

  const { data: planData, isLoading: planLoading } = useQuery({
    queryKey: ['plan-success'],
    queryFn: fetchPlanSuccess,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600">Análise detalhada da performance do sistema</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-600" />
              Distribuição de Sentimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sentimentLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <Chart type="pie" data={sentimentData} />
            )}
          </CardContent>
        </Card>

        {/* Tool Usage */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-blue-600" />
              Uso de Ferramentas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {toolLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <Chart type="bar" data={toolData} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Plan Success Rates */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Taxa de Sucesso por Plano
          </CardTitle>
        </CardHeader>
        <CardContent>
          {planLoading ? (
            <div className="h-[200px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {planData?.map((plan: any, index: number) => (
                <div key={index} className="bg-white/80 rounded-lg p-4 border border-slate-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-900">{plan.name}</h3>
                    <span className="text-2xl font-bold text-green-600">{plan.successRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${plan.successRate}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {plan.totalRuns} execuções totais
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Timeline */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Timeline de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Chart type="line" />
        </CardContent>
      </Card>
    </div>
  );
};
