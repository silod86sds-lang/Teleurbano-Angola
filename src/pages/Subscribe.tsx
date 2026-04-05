import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Crown, CheckCircle2, MessageCircle, CreditCard, ChevronRight } from 'lucide-react';

export function Subscribe() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const handleSubscribeClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowPaymentInfo(true);
  };

  const handleWhatsAppClick = () => {
    const message = `Olá, aqui está o meu comprovativo de pagamento para o plano Premium. Meu email é: ${user?.email}`;
    const whatsappUrl = `https://wa.me/244947888735?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    'Acesso ilimitado a todo o catálogo',
    'Conteúdos exclusivos Premium',
    'Qualidade 4K HDR',
    'Sem anúncios',
    'Assista em até 4 telas simultâneas',
    'Download para assistir offline'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 mb-4">Escolha seu Plano</h1>
        <p className="text-xl text-slate-400 font-medium tracking-wide">Tenha a melhor experiência de entretenimento.</p>
      </div>

      <div className="max-w-lg mx-auto bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative z-10 hover:shadow-[0_0_60px_rgba(245,158,11,0.25)] transition-shadow duration-500">
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>
        
        <div className="p-10 text-center border-b border-slate-800/50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none"></div>
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-6 shadow-inner ring-1 ring-amber-500/30 relative z-10">
            <Crown className="w-10 h-10 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 relative z-10">Plano Premium</h2>
          <div className="flex items-center justify-center gap-1.5 relative z-10">
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">Kz 5.000</span>
            <span className="text-slate-400 font-medium text-lg">/mês</span>
          </div>
        </div>

        <div className="p-10">
          {!showPaymentInfo ? (
            <>
              <ul className="space-y-5 mb-10">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 text-slate-300 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {user?.isPremium ? (
                <div className="space-y-4">
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-xl text-slate-400 font-bold text-lg bg-slate-800 cursor-not-allowed flex items-center justify-center gap-2 border border-slate-700 tv-focusable"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    Você já é Premium
                  </button>
                  {user.premiumUntil && (
                    <p className="text-center text-sm text-amber-400 font-medium">
                      Válido até: {new Date(user.premiumUntil).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSubscribeClick}
                  className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 tv-focusable"
                >
                  <Crown className="w-6 h-6" />
                  Assinar Agora
                </button>
              )}
              <p className="text-center text-sm text-slate-500 mt-6 font-medium">
                Válido por 30 dias após a confirmação.
              </p>
            </>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-amber-500" />
                  Dados de Pagamento
                </h3>
                <p className="text-slate-300 mb-4">
                  Faça o pagamento via <strong>Multicaixa Express</strong> para o número abaixo:
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex items-center justify-center mb-6">
                  <span className="text-3xl font-mono font-bold text-amber-400 tracking-wider">947 888 735</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm text-slate-400 font-medium">
                    Após o pagamento, envie o comprovativo pelo WhatsApp para liberação do seu acesso. O plano será válido por 1 mês após a confirmação.
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-[#25D366] hover:bg-[#128C7E] transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 tv-focusable"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Enviar Comprovativo
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => setShowPaymentInfo(false)}
                className="w-full text-slate-400 hover:text-white font-medium text-sm transition-colors"
              >
                Voltar para os benefícios
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
