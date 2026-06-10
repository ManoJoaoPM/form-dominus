import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Check, Loader2 } from 'lucide-react';
import { pushToDataLayer } from '../utils/gtm';

const stepNames = [
  'name',
  'email',
  'phone',
  'company',
  'profile',
  'challenges',
  'investment',
  'link',
  'success'
];

interface LeadFormProps {
  initialProfile?: string;
  onBackToIntro: () => void;
  source?: string;
}

export function LeadForm({ initialProfile = '', onBackToIntro, source = 'Landing Page Dominus' }: LeadFormProps) {
  const [step, setStep] = useState(1); // 1 to 9
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    link: '',
    challenges: [] as string[],
    investment: '',
    profile: initialProfile
  });

  const totalSteps = 8; // Steps 1-8 are form questions

  useEffect(() => {
    if (step > 0 && step <= totalSteps) {
      if (step === 1) {
        pushToDataLayer('form_start');
      }
      pushToDataLayer('step_view', { 
        step_number: step,
        step_name: stepNames[step - 1]
      });
    } else if (step === 9) {
      pushToDataLayer('generate_lead', {
        lead_name: formData.name,
        lead_email: formData.email,
        lead_phone: formData.phone,
        lead_company: formData.company,
        lead_profile: formData.profile,
        lead_investment: formData.investment,
        lead_challenges: formData.challenges.join(', ')
      });
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step === 1) {
      onBackToIntro();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: source,
          submittedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar o formulário');
      }

      setStep(9);
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      setSubmitError('Ocorreu um erro ao enviar suas informações. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 relative z-10 w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="relative bg-dominus-surface/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-dominus-border/50 shadow-2xl min-h-[400px] flex flex-col justify-center">
          
          {step > 0 && step <= totalSteps && (
            <div className="absolute top-8 left-8 right-8 flex items-center gap-1.5 mb-12">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2 flex-1">
                  <div className={`h-[4px] w-full transition-all duration-500 rounded-full ${step >= idx + 1 ? 'bg-dominus-accent' : 'bg-dominus-border'}`} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            {step === 1 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Como podemos chamar você?</p>
                
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      autoFocus
                      className="w-full bg-transparent border-b border-dominus-border py-4 text-lg text-dominus-text focus:outline-none focus:border-dominus-accent transition-colors placeholder:text-dominus-muted/50"
                    />
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!formData.name.trim()}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Qual é o seu melhor e-mail corporativo?</p>
                
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail"
                      autoFocus
                      className="w-full bg-transparent border-b border-dominus-border py-4 text-lg text-dominus-text focus:outline-none focus:border-dominus-accent transition-colors placeholder:text-dominus-muted/50"
                    />
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!formData.email.includes('@')}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Qual é o seu WhatsApp para contato?</p>
                
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(DD) 90000-0000"
                      autoFocus
                      className="w-full bg-transparent border-b border-dominus-border py-4 text-lg text-dominus-text focus:outline-none focus:border-dominus-accent transition-colors placeholder:text-dominus-muted/50"
                    />
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={formData.phone.length < 10}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Qual é o nome da sua Imobiliária?</p>
                
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nome da imobiliária"
                      autoFocus
                      className="w-full bg-transparent border-b border-dominus-border py-4 text-lg text-dominus-text focus:outline-none focus:border-dominus-accent transition-colors placeholder:text-dominus-muted/50"
                    />
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!formData.company.trim()}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Qual o perfil principal dos imóveis que você negocia?</p>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    {[
                      "Médio / Alto Padrão",
                      "Minha Casa Minha Vida (Econômico)",
                      "Lançamentos / Na Planta",
                      "Misto (Venda Geral e Aluguel)"
                    ].map((option) => {
                      const isSelected = formData.profile === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, profile: option })}
                          className={`w-full text-left px-4 py-4 border rounded-lg transition-colors flex items-center gap-3 ${
                            isSelected 
                              ? 'border-dominus-accent bg-dominus-accent/10 text-dominus-accent' 
                              : 'border-dominus-border bg-transparent text-dominus-text hover:border-dominus-muted'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                            isSelected ? 'border-dominus-accent bg-dominus-accent' : 'border-dominus-border'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className="text-sm md:text-base leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!formData.profile}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-6 font-bold text-xl md:text-2xl leading-tight">Qual é o seu maior desafio com marketing/vendas hoje?</p>
                <p className="text-dominus-muted mb-8 font-light text-sm">Você pode selecionar mais de uma opção.</p>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    {[
                      "Meus leads estão desqualificados",
                      "Preciso melhorar minhas redes sociais",
                      "Preciso melhorar meu site/CRM",
                      "Não sei diagnosticar exatamente meu problema"
                    ].map((option) => {
                      const isSelected = formData.challenges.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            const current = formData.challenges;
                            const updated = isSelected
                              ? current.filter(c => c !== option)
                              : [...current, option];
                            setFormData({ ...formData, challenges: updated });
                          }}
                          className={`w-full text-left px-4 py-4 border rounded-lg transition-colors flex items-center gap-3 ${
                            isSelected 
                              ? 'border-dominus-accent bg-dominus-accent/10 text-dominus-accent' 
                              : 'border-dominus-border bg-transparent text-dominus-text hover:border-dominus-muted'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                            isSelected ? 'border-dominus-accent bg-dominus-accent' : 'border-dominus-border'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className="text-sm md:text-base leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={formData.challenges.length === 0}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Qual o seu investimento mensal atual em anúncios?</p>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    {[
                      "Ainda não invisto / Menos de R$ 1.500",
                      "De R$ 1.500 a R$ 3.000",
                      "De R$ 3.000 a R$ 10.000",
                      "Acima de R$ 10.000"
                    ].map((option) => {
                      const isSelected = formData.investment === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, investment: option })}
                          className={`w-full text-left px-4 py-4 border rounded-lg transition-colors flex items-center gap-3 ${
                            isSelected 
                              ? 'border-dominus-accent bg-dominus-accent/10 text-dominus-accent' 
                              : 'border-dominus-border bg-transparent text-dominus-text hover:border-dominus-muted'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                            isSelected ? 'border-dominus-accent bg-dominus-accent' : 'border-dominus-border'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className="text-sm md:text-base leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={prevStep}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Voltar
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!formData.investment}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      Próximo
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <p className="text-dominus-text mb-8 font-bold text-xl md:text-2xl leading-tight">Deixe o link do seu Site ou Instagram (Opcional).</p>
                
                <form onSubmit={submitForm} className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="url" 
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      placeholder="https://..."
                      autoFocus
                      className="w-full bg-transparent border-b border-dominus-border py-4 text-lg text-dominus-text focus:outline-none focus:border-dominus-accent transition-colors placeholder:text-dominus-muted/50"
                    />
                  </div>
                  
                  <div className="flex gap-4 mt-12">
                    <button 
                      type="button"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="py-4 px-6 border border-dominus-border text-dominus-muted hover:text-dominus-text hover:border-dominus-muted transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50"
                    >
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-dominus-accent text-dominus-bg font-bold hover:bg-dominus-accentHover transition-all disabled:opacity-50 disabled:hover:bg-dominus-accent flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          Enviando...
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>
                          Finalizar
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                  {submitError && (
                    <p className="text-red-500 text-sm text-center mt-4 font-medium">{submitError}</p>
                  )}
                </form>
              </div>
            )}

            {step === 9 && (
              <div className="animate-fade-in-up opacity-0 flex flex-col items-center justify-center text-center py-12" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 rounded-full border border-dominus-accent flex items-center justify-center mb-8 bg-dominus-accent/10">
                  <Check className="w-8 h-8 text-dominus-accent" />
                </div>
                <h3 className="text-3xl font-display mb-4">Solicitação Recebida</h3>
                <p className="text-dominus-muted font-light max-w-sm">
                  Obrigado pelo interesse, {formData.name.split(' ')[0]}. Nossa equipe de especialistas entrará em contato em breve.
                </p>
                
                <button 
                  onClick={onBackToIntro}
                  className="mt-12 text-sm text-dominus-muted hover:text-dominus-accent transition-colors uppercase tracking-wider"
                >
                  Voltar ao início
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
