
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  BarChart3, 
  Users, 
  Database, 
  ArrowRight,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              Kora Brain Dashboard
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Painel de controle inteligente para monitorar e otimizar suas interações de IA, 
              gerenciar leads e analisar performance em tempo real.
            </p>
            
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-lg shadow-blue-500/25">
                Acessar Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:bg-white/80 transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-500/20 rounded-xl flex items-center justify-center mb-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Analytics Avançados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Visualize métricas detalhadas de performance, taxa de conversão e insights de comportamento.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:bg-white/80 transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-500/20 rounded-xl flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Gestão de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Acompanhe o pipeline completo, histórico de conversas e status de qualificação.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:bg-white/80 transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-purple-500/20 rounded-xl flex items-center justify-center mb-2">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Base de Conhecimento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Gerencie dores, soluções, objeções e provas sociais para otimizar respostas da IA.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:bg-white/80 transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-indigo-500/20 rounded-xl flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Automação Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Configure planos, ferramentas e estratégias para maximizar a eficiência do agente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">70%+</div>
                <div className="text-blue-100">Taxa Média de Sucesso</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Monitoramento Contínuo</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Brain className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">IA</div>
                <div className="text-blue-100">Insights Automáticos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
