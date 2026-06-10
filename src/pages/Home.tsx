import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { pushToDataLayer } from '../utils/gtm';

export default function Home() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      pushToDataLayer('page_view', { page_path: '/' });
    }
  }, [started]);

  const handleStart = () => {
    pushToDataLayer('form_start');
    setStarted(true);
  };

  return (
    <Layout>
      {!started ? (
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 relative z-10 animate-fade-in-up">
          <div className="max-w-3xl w-full mx-auto md:mx-0 md:ml-[10%] lg:ml-[15%] text-left">
            <span className="text-sm md:text-base tracking-[0.2em] font-sans text-dominus-accent uppercase font-bold mb-4 block">
              Formulário de Interesse
            </span>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-display font-black leading-[0.95] text-dominus-text uppercase mb-6 tracking-tight">
              Eleve o <br className="hidden md:block" />
              <span className="text-dominus-accent">padrão</span> da <br className="hidden md:block" />
              sua imobiliária.
            </h2>
            
            <p className="mt-8 text-dominus-muted font-sans font-light max-w-xl text-lg md:text-xl leading-relaxed">
              Estamos prontos para impulsionar seus resultados com estratégias exclusivas. Responda com calma para entendermos se essa solução é a melhor pro seu momento, ok?
            </p>

            <button 
              onClick={handleStart}
              className="mt-12 w-full sm:w-auto px-10 py-5 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-colors uppercase tracking-widest text-sm"
            >
              [ COMEÇAR AGORA ]
            </button>
          </div>
        </div>
      ) : (
        <LeadForm 
          onBackToIntro={() => setStarted(false)} 
          source="Landing Page Dominus - Geral"
        />
      )}
    </Layout>
  );
}
