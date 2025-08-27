
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Search, 
  Plus,
  Heart,
  Lightbulb,
  AlertTriangle,
  Award,
  BookOpen
} from 'lucide-react';

const fetchKnowledgeStats = async () => {
  const response = await fetch('http://localhost:3005/api/knowledgebase/stats');
  if (!response.ok) throw new Error('Erro ao buscar stats');
  return response.json();
};

const fetchKnowledgeItems = async (nodeType: string) => {
  const response = await fetch(`http://localhost:3005/api/knowledgebase/items/${nodeType}`);
  if (!response.ok) throw new Error('Erro ao buscar itens');
  return response.json();
};

const nodeTypeConfig = {
  DorComum: { 
    icon: Heart, 
    color: 'text-red-600', 
    bgColor: 'bg-red-50/60', 
    borderColor: 'border-red-200/60',
    title: 'Dores Comuns'
  },
  SolucaoOferecida: { 
    icon: Lightbulb, 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-50/60', 
    borderColor: 'border-blue-200/60',
    title: 'Soluções Oferecidas'
  },
  ObjecaoComum: { 
    icon: AlertTriangle, 
    color: 'text-amber-600', 
    bgColor: 'bg-amber-50/60', 
    borderColor: 'border-amber-200/60',
    title: 'Objeções Comuns'
  },
  SocialProof: { 
    icon: Award, 
    color: 'text-green-600', 
    bgColor: 'bg-green-50/60', 
    borderColor: 'border-green-200/60',
    title: 'Provas Sociais'
  },
  KnowledgeTopic: { 
    icon: BookOpen, 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-50/60', 
    borderColor: 'border-purple-200/60',
    title: 'Tópicos de Conhecimento'
  }
};

const KnowledgeItemsList: React.FC<{ nodeType: string }> = ({ nodeType }) => {
  const { data: items, isLoading } = useQuery({
    queryKey: ['knowledge-items', nodeType],
    queryFn: () => fetchKnowledgeItems(nodeType),
  });

  const config = nodeTypeConfig[nodeType as keyof typeof nodeTypeConfig];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items?.map((item: any, index: number) => (
        <Card key={index} className={`${config.bgColor} border ${config.borderColor}`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <config.icon className={`w-5 h-5 ${config.color} mt-1`} />
              <div className="flex-1">
                <h3 className="font-medium text-slate-900 mb-1">
                  {item.nome || item.title || item.name || 'Item sem nome'}
                </h3>
                {item.descricao && (
                  <p className="text-sm text-slate-600 mb-2">{item.descricao}</p>
                )}
                <div className="flex items-center space-x-2">
                  {item.tags && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {item.category && (
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )) || (
        <div className="text-center py-8">
          <config.icon className={`w-12 h-12 ${config.color} mx-auto mb-4 opacity-50`} />
          <p className="text-slate-500">Nenhum item encontrado para {config.title}</p>
        </div>
      )}
    </div>
  );
};

export const KnowledgeBasePage = () => {
  const [activeTab, setActiveTab] = useState('DorComum');
  
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['knowledge-stats'],
    queryFn: fetchKnowledgeStats,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Base de Conhecimento</h1>
          <p className="text-slate-600">Gerencie o conhecimento do seu agente de IA</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Item
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(nodeTypeConfig).map(([nodeType, config]) => {
          const count = stats ? stats[
            nodeType === 'DorComum' ? 'commonPains' :
            nodeType === 'SolucaoOferecida' ? 'solutionsOffered' :
            nodeType === 'ObjecaoComum' ? 'commonObjections' :
            nodeType === 'SocialProof' ? 'socialProofs' :
            'knowledgeTopics'
          ] : 0;

          return (
            <Card key={nodeType} className={`${config.bgColor} border ${config.borderColor}`}>
              <CardContent className="p-4 text-center">
                <config.icon className={`w-8 h-8 ${config.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-sm text-slate-600">{config.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Knowledge Items */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-600" />
            Itens da Base de Conhecimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              {Object.entries(nodeTypeConfig).map(([nodeType, config]) => (
                <TabsTrigger key={nodeType} value={nodeType} className="text-sm">
                  <config.icon className="w-4 h-4 mr-2" />
                  {config.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.keys(nodeTypeConfig).map((nodeType) => (
              <TabsContent key={nodeType} value={nodeType} className="mt-6">
                <KnowledgeItemsList nodeType={nodeType} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
