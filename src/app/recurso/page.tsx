'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Recurso() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    local: '',
    placa: '',
    descricao: '',
    argumentos: ''
  });
  const [generatedText, setGeneratedText] = useState('');

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateResource = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Simulação de geração de texto
    const texto = `RECURSO ADMINISTRATIVO CONTRA MULTA

Nome: ${formData.nome}
Data da Infração: ${formData.data}
Local: ${formData.local}
Placa: ${formData.placa}

Descrição: ${formData.descricao}

Argumentos de Defesa: ${formData.argumentos}

Solicito a reconsideração da multa aplicada.`;

    setGeneratedText(texto);

    // Salvar no Supabase
    const { error } = await supabase
      .from('recursos')
      .insert({
        usuario_id: user.id,
        texto_gerado: texto,
        modo_cabecalho: true,
        status: 'gerado'
      });

    if (error) {
      console.error('Erro ao salvar recurso:', error);
      alert('Erro ao gerar recurso');
    } else {
      alert('Recurso gerado e salvo com sucesso!');
    }
  };

  const steps = [
    { title: 'Dados Pessoais', fields: ['nome'] },
    { title: 'Data e Local', fields: ['data', 'local'] },
    { title: 'Veículo', fields: ['placa'] },
    { title: 'Descrição', fields: ['descricao'] },
    { title: 'Argumentos', fields: ['argumentos'] },
    { title: 'Revisão Final', fields: [] }
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Criar Recurso</h1>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            Passo {step} de 6: {steps[step - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
          )}

          {step === 2 && (
            <>
              <div>
                <Label htmlFor="data">Data da Infração</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="local">Local da Infração</Label>
                <Input
                  id="local"
                  value={formData.local}
                  onChange={(e) => setFormData({...formData, local: e.target.value})}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <Label htmlFor="placa">Placa do Veículo</Label>
              <Input
                id="placa"
                value={formData.placa}
                onChange={(e) => setFormData({...formData, placa: e.target.value})}
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <Label htmlFor="descricao">Descrição da Infração</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <Label htmlFor="argumentos">Argumentos de Defesa</Label>
              <Textarea
                id="argumentos"
                value={formData.argumentos}
                onChange={(e) => setFormData({...formData, argumentos: e.target.value})}
              />
            </div>
          )}

          {step === 6 && (
            <div>
              <h3 className="font-bold">Revisão dos Dados:</h3>
              <p>Nome: {formData.nome}</p>
              <p>Data: {formData.data}</p>
              <p>Local: {formData.local}</p>
              <p>Placa: {formData.placa}</p>
              <p>Descrição: {formData.descricao}</p>
              <p>Argumentos: {formData.argumentos}</p>
              <Button onClick={generateResource} className="w-full mt-4">
                <Download className="w-4 h-4 mr-2" />
                Gerar Recurso
              </Button>
              {generatedText && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <pre>{generatedText}</pre>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && <Button variant="outline" onClick={handlePrev}>Voltar</Button>}
            {step < 6 && <Button onClick={handleNext}>Próximo</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}