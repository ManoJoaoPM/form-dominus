import { useState } from 'react';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { pushToDataLayer } from '../utils/gtm';

export default function MCMV() {
  const [started, setStarted] = useState(false);

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
              Especialistas em MCMV
            </span>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-display font-black leading-[0.95] text-dominus-text uppercase tracking-tight">
                Escale suas <br className="hidden md:block" />
                <span className="text-dominus-accent">vendas</span> no <br className="hidden md:block" />
                Minha Casa Minha Vida.
              </h2>
              <img src="/logo-mcmv-2023.webp" alt="Minha Casa Minha Vida" className="w-32 md:w-40 lg:w-48 object-contain" />
            </div>
            
            <p className="mt-8 text-dominus-muted font-sans font-light max-w-xl text-lg md:text-xl leading-relaxed">
              Escritório especializado em MCMV, preencha o formulário que nosso time entrará em contato com você.
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
          initialProfile="Minha Casa Minha Vida (Econômico)" 
          onBackToIntro={() => setStarted(false)} 
          source="Landing Page Dominus - MCMV"
        />
      )}
    </Layout>
  );
}
