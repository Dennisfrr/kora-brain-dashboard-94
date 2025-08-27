
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  User, 
  Building, 
  Calendar, 
  MessageCircle,
  Brain,
  Target,
  Heart,
  Lightbulb
} from 'lucide-react';

const fetchLeadDetail = async (leadId: string) => {
  const response = await fetch(`http://localhost:3005/api/leads/${leadId}`);
  if (!response.ok) throw new Error('Erro ao buscar detalhes do lead');
  return response.json();
};

export const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead-detail', id],
    queryFn: () => fetchLeadDetail(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600">Lead não encontrado</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/dashboard/leads">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {lead.name || `Lead ${lead.whatsappId?.substring(0, 8)}`}
          </h1>
          <p className="text-slate-600">Detalhes completos do lead</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Nome</label>
              <p className="text-slate-900">{lead.name || 'Não informado'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">WhatsApp ID</label>
              <p className="text-slate-900 font-mono text-sm">{lead.whatsappId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Nível de Interesse</label>
              <Badge className="ml-2">
                {lead.meetingInterest || 'não definido'}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Última Interação</label>
              <p className="text-slate-900">
                {lead.lastInteraction ? new Date(lead.lastInteraction).toLocaleString('pt-BR') : 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Negócio */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              Negócio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Nome da Empresa</label>
              <p className="text-slate-900">{lead.businessName || 'Não informado'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Tipo de Negócio</label>
              <p className="text-slate-900">{lead.businessType || 'Não informado'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Plano Atual</label>
              <Badge variant="outline" className="ml-2">
                {lead.currentPlan || 'Nenhum'}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Etapa Atual</label>
              <p className="text-slate-900">{lead.currentStep || 'Não definida'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Dores Identificadas */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              Dores Identificadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lead.pains && lead.pains.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {lead.pains.map((pain: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-red-50 text-red-700">
                    {pain}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Nenhuma dor identificada ainda</p>
            )}
          </CardContent>
        </Card>

        {/* Interesses */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
              Interesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lead.interests && lead.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {lead.interests.map((interest: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-yellow-50 text-yellow-700">
                    {interest}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Nenhum interesse identificado ainda</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumo da Situação */}
      {lead.lastSummary && (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              Último Resumo da Situação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50/60 rounded-lg p-4">
              <p className="text-slate-700">{lead.lastSummary}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interpretações de IA */}
      {lead.lastLatentInterpretations && lead.lastLatentInterpretations.length > 0 && (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-indigo-600" />
              Interpretações Recentes da IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lead.lastLatentInterpretations.map((interpretation: any, index: number) => (
                <div key={index} className="bg-indigo-50/60 rounded-lg p-4 border border-indigo-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-indigo-900">Interpretação #{index + 1}</h4>
                    <Badge variant="outline">
                      Confiança: {Math.round(interpretation.confidenceScore * 100)}%
                    </Badge>
                  </div>
                  <p className="text-indigo-800 mb-2">{interpretation.interpretation}</p>
                  <div className="text-sm text-indigo-600">
                    <p><strong>Foco sugerido:</strong> {interpretation.suggestedAgentFocus}</p>
                    <p><strong>Objetivo potencial:</strong> {interpretation.potentialUserGoal}</p>
                    <p><strong>Tom emocional:</strong> {interpretation.emotionalToneHint}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
