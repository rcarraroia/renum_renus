import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Landmark, HeartPulse, Wrench, ArrowRight } from 'lucide-react';
import { useRenusChat } from '@/context/RenusChatContext';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const nicheData = [
  {
    icon: Network,
    title: "Distribuidores MMN",
    description: "Ferramentas que potencializam seu negócio e equipe de distribuidores.",
    example: "Automatização de follow-up e qualificação de leads",
    color: "text-[#FF6B35]",
  },
  {
    icon: Landmark,
    title: "Assessores Parlamentares",
    description: "Sistemas para organização de demandas e comunicação eficiente.",
    example: "Gestão inteligente de solicitações e acompanhamento de projetos",
    color: "text-[#4e4ea8]",
  },
  {
    icon: HeartPulse,
    title: "Profissionais de Saúde",
    description: "Soluções para clínicas médicas, odontológicas, terapeutas e psicólogos.",
    example: "Agendamento inteligente e comunicação automatizada com pacientes",
    color: "text-green-500",
  },
  {
    icon: Wrench,
    title: "Prestadores de Serviços",
    description: "Ferramentas para melhorar atendimento e gestão de serviços.",
    example: "Sistemas personalizados para seu tipo de negócio",
    color: "text-[#0ca7d2]",
  },
];

interface NicheCardProps {
    data: typeof nicheData[0];
    index: number;
}

const NicheCard: React.FC<NicheCardProps> = ({ data, index }) => {
    const { icon: Icon, title, description, example, color } = data;
    const { openChat } = useRenusChat();
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-2 hover:border-[#FF6B35] dark:border-gray-700 dark:hover:border-[#0ca7d2]">
                <CardHeader className="flex flex-col items-start space-y-2">
                    <Icon className={cn("h-10 w-10 mb-2", color)} />
                    <CardTitle className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription className="mb-4">{description}</CardDescription>
                    
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-border dark:border-gray-700">
                        <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Exemplo de Solução:</p>
                        <p className="text-sm italic">{example}</p>
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button variant="link" className="p-0 h-auto text-[#4e4ea8] dark:text-[#0ca7d2] hover:text-[#FF6B35]" onClick={openChat}>
                        Fale com Renus sobre {title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
};

const NichesSection: React.FC = () => {
  const { openChat } = useRenusChat();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="niches" className="py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
        >
            <h2 
                className="text-4xl md:text-5xl font-bold mb-4 text-primary dark:text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
                Soluções Para Seu Setor
            </h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Nossa expertise é focada em nichos de alto impacto, onde a IA e a automação geram resultados exponenciais.
            </p>
        </motion.div>

        {/* Niche Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {nicheData.map((niche, index) => (
            <NicheCard key={index} data={niche} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
        >
            <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-[#0ca7d2] hover:bg-[#0987a8] text-white shadow-lg"
                onClick={openChat}
            >
                Descubra soluções personalizadas para seu setor
            </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NichesSection;