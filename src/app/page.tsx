'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Car, Clock, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Multa {
  id: string;
  usuario_id: string;
  auto_infracao: string;
  tipo_infracao: string;
  data: string;
  local: string;
  uf: string;
  detalhes_coletados: any;
  created_at: string;
}

export default function Home() {
  const [multas, setMultas] = useState<Multa[]>([]);
  const [totalPontos, setTotalPontos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('multas')
          .select('*')
          .eq('usuario_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erro ao buscar multas:', error);
        } else {
          setMultas(data || []);
          const pontos = data?.reduce((acc, multa) => acc + (multa.detalhes_coletados?.pontos || 0), 0) || 0;
          setTotalPontos(pontos);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const multasRecentes = multas.filter(m => m.detalhes_coletados?.status === 'pendente').slice(0, 3);
  const riscoSuspensao = totalPontos >= 20 ? 'Alto' : totalPontos >= 10 ? 'Médio' : 'Baixo';
  const prazoDefesa = multasRecentes.length > 0 ? 15 : 0;

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Hoje</h1>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <FileText className="w-6 h-6 text-yellow-600" />
          </div>
          <CardTitle className="text-lg">Multas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{multasRecentes.length} multas pendentes</p>
          <p className="text-sm text-gray-600">Prazo: {prazoDefesa} dias</p>
          <Button variant="outline" className="mt-2">Ver mais</Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <Car className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-lg">Pontos na CNH</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className={`h-2 rounded-full`} style={{ width: `${(totalPontos / 40) * 100}%`, backgroundColor: totalPontos >= 20 ? '#ef4444' : totalPontos >= 10 ? '#f59e0b' : '#10b981' }}></div>
          </div>
          <p className="text-sm text-gray-600">{totalPontos} pontos acumulados</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-lg">Risco de Suspensão</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Status: {riscoSuspensao}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <CardTitle className="text-lg">Prazo para Defesa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{prazoDefesa} dias restantes</p>
        </CardContent>
      </Card>
    </div>
  );
}