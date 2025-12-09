'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Brain, FileText, Star, User } from 'lucide-react';

const menuItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/diagnostico', icon: Brain, label: 'Diagnóstico IA' },
  { href: '/recurso', icon: FileText, label: 'Criar Recurso' },
  { href: '/servicos', icon: Star, label: 'Serviços Premium' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export default function BottomMenu() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}