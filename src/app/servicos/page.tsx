'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, FileText, MessageCircle, Calendar, Zap } from 'lucide-react';

const servicos = [
  {
    icon: FileText,
    title: 'Recurso Profissional',
    description: 'Análise completa e recurso personalizado por especialista',
    preco: 'R$ 99,90'
  },
  {
    icon: Star,
    title: 'Auditoria Técnica',
    description: 'Verificação detalhada do auto de infração',
    preco: 'R$ 149,90'
  },
  {
    icon: Calendar,
    title: 'Plano Anual',
    description: 'Recursos ilimitados por 12 meses',
    preco: 'R$ 299,90/ano'
  },
  {
    icon: MessageCircle,
    title: 'Consultoria por Chat',
    description: 'Acesso direto a especialistas via chat',
    preco: 'R$ 49,90/mês'
  },
  {
    icon: Zap,
    title: 'Geração Ilimitada',
    description: 'Recursos automáticos sem limites',
    preco: 'R$ 19,90/mês'
  }
];

export default function ServicosPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Serviços Premium</h1>
      <div className="space-y-4">
        {servicos.map((servico, index) => (
          <Card key={index} className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <servico.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{servico.title}</CardTitle>
                <p className="text-sm text-gray-600">{servico.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{servico.preco}</p>
                <Button size="sm" className="mt-2">Contratar</Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}