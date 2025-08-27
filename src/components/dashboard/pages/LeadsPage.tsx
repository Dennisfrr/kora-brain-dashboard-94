
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Filter, 
  Eye,
  Calendar,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

const fetchLeads = async () => {
  const response = await fetch('http://localhost:3005/api/leads?limit=20');
  if (!response.ok) throw new Error('Erro ao buscar leads');
  return response.json();
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'agendado': return 'bg-green-100 text-green-800 border-green-200';
    case 'alto': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'médio': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'baixo': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const LeadsPage = () => {
  const { data: leadsData, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const leads = leadsData?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-600">Gerencie e acompanhe todos os seus leads</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, telefone ou empresa..."
                className="pl-10"
              />
            </div>
            <Button>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Lista de Leads ({leads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead: any) => (
              <div
                key={lead.id}
                className="bg-white/80 rounded-lg border border-slate-200/60 p-4 hover:bg-white transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {lead.name || `Lead ${lead.whatsappId?.substring(0, 8)}`}
                      </h3>
                      <Badge className={getStatusColor(lead.meetingInterest)}>
                        {lead.meetingInterest || 'não definido'}
                      </Badge>
                      {lead.currentPlan && (
                        <Badge variant="outline">
                          {lead.currentPlan}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">Empresa:</span>
                        <p>{lead.businessName || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Tipo:</span>
                        <p>{lead.businessType || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Última Interação:</span>
                        <p>{lead.lastInteraction ? new Date(lead.lastInteraction).toLocaleDateString('pt-BR') : 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Dores:</span>
                        <p>{lead.pains?.length || 0} identificadas</p>
                      </div>
                    </div>

                    {lead.lastSummary && (
                      <div className="mt-3 p-3 bg-slate-50/60 rounded-lg">
                        <p className="text-sm text-slate-700 line-clamp-2">
                          {lead.lastSummary}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Link to={`/dashboard/leads/${lead.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {leads.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                Nenhum lead encontrado
              </h3>
              <p className="text-slate-500">
                Os leads aparecerão aqui quando forem criados pelo sistema.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
