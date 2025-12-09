'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Brain } from 'lucide-react';

export default function Diagnostico() {
  const [foto, setFoto] = useState<File | null>(null);
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const handleSubmit = () => {
    // Simulação de análise IA
    setResultado({
      probabilidade: '75%',
      pontos: 4,
      defesa: 'Defesa administrativa',
      orientacao: 'Você pode contestar alegando erro na autuação.'
    });
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Diagnóstico IA</h1>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-6 h-6 mr-2" />
            Análise da Multa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="foto">Foto da Multa</Label>
            <Input
              id="foto"
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <Label htmlFor="texto">Descrição da Infração</Label>
            <Textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Descreva o que aconteceu..."
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoria da Infração</Label>
            <Input
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ex: Excesso de velocidade"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Analisar com IA
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Resultado da Análise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Probabilidade de Reversão:</strong> {resultado.probabilidade}</p>
            <p><strong>Pontos na CNH:</strong> {resultado.pontos}</p>
            <p><strong>Tipo de Defesa:</strong> {resultado.defesa}</p>
            <p><strong>Orientação:</strong> {resultado.orientacao}</p>
            <Button className="w-full mt-4">Gerar Recurso Automático</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}