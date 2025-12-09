'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error) {
          setProfile(data);
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Perfil</h1>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-lg">Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600"><Mail className="w-4 h-4 inline mr-2" />Email: {user?.email}</p>
          <p className="text-sm text-gray-600"><User className="w-4 h-4 inline mr-2" />Nome: {profile?.full_name || 'Não informado'}</p>
          <p className="text-sm text-gray-600"><Star className="w-4 h-4 inline mr-2" />Plano: {profile?.plan || 'Gratuito'}</p>
          <p className="text-sm text-gray-600"><Calendar className="w-4 h-4 inline mr-2" />Criado em: {new Date(user?.created_at).toLocaleDateString()}</p>
        </CardContent>
      </Card>

      <Button onClick={handleLogout} variant="outline" className="w-full">
        Sair
      </Button>
    </div>
  );
}