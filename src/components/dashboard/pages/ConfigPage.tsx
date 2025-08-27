
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Brain, 
  Wrench, 
  Zap,
  Save,
  RotateCcw
} from 'lucide-react';

const fetchAgentConfig = async () => {
  const response = await fetch('http://localhost:3005/api/agent/config');
  if (!response.ok) throw new Error('Erro ao buscar configuração');
  return response.json();
};

const fetchAgentTools = async () => {
  const response = await fetch('http://localhost:3005/api/agent/tools');
  if (!response.ok) throw new Error('Erro ao buscar ferramentas');
  return response.json();
};

export const ConfigPage = () => {
  const { data: config, isLoading: configLoading } = useQuery({
    queryKey: ['agent-config'],
    queryFn: fetchAgentConfig,
  });

  const { data: tools, isLoading: toolsLoading } = useQuery({
    queryKey: ['agent-tools'],
    queryFn: fetchAgentTools,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-600">Configure o comportamento e ferramentas do agente</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Configuration */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Configuração do Agente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {configLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 bg-slate-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Nome do Agente</label>
                    <p className="text-slate-900 font-medium">{config?.agentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Modelo LLM</label>
                    <p className="text-slate-900 font-medium">{config?.llmModel}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Temperatura</label>
                    <p className="text-slate-900 font-medium">{config?.temperature}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Delay (ms)</label>
                    <p className="text-slate-900 font-medium">{config?.debounceDelayMs}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Max Iterações</label>
                  <p className="text-slate-900 font-medium">{config?.maxToolIterations}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Prompt Base</label>
                  <div className="mt-2 p-3 bg-slate-50/60 rounded-lg">
                    <p className="text-sm text-slate-700 line-clamp-3">
                      {config?.systemPromptBase || 'Não configurado'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tools Configuration */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-indigo-600" />
              Ferramentas do Agente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {toolsLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {tools?.map((tool: any) => (
                  <div key={tool.id} className="bg-white/80 rounded-lg p-4 border border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-slate-900">{tool.name}</h3>
                        <Badge variant={tool.isActive ? 'default' : 'secondary'}>
                          {tool.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <Switch checked={tool.isActive} />
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-green-600" />
            Status do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-medium text-slate-900">Agente Principal</h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-medium text-slate-900">Base de Dados</h3>
              <p className="text-sm text-green-600">Conectado</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-medium text-slate-900">API Dashboard</h3>
              <p className="text-sm text-green-600">Funcionando</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
