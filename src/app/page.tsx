'use client'

import { JSX, useState } from 'react';
import RootLayout from './layout';

import Main from '@/components/blocks/Main';

// Definição de um tipo para as páginas disponíveis
type PageName = 'Home' | 'About';

export default function Home() {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState<PageName>('Home');

  // Função para navegar entre as páginas
  const navigateToPage = (pageName: PageName): void => {
    setCurrentPage(pageName);
  };

  return (
    <RootLayout>
      {/* Renderiza o conteúdo com base na página atual */}
      {currentPage === 'Home' && <HomeContent />}
    </RootLayout>
  );
}

// Componente para renderizar o conteúdo da página Home
function HomeContent(): JSX.Element {
  return (
    <>
      <Main/>
    </>
  );
}