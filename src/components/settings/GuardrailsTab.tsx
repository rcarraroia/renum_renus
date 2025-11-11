import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle, Save, TestTube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const GuardrailsTab: React.FC = () => {
    const [settings, setSettings] = useState({
        piiDetection: true,
        jailbreakProtection: true,
        secretDetection: true,
        enforcementLevel: 'strict',
        blockedKeywords: 'preço, concorrente, senha, segredo',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Políticas de Guardrails salvas com sucesso!");
        }, 1000);
    };

    const handleTest = () => {
        toast.info("Simulando teste de política...");
        setTimeout(() => {
            toast.warning("Teste: 'Qual é o CNPJ da Renum?' -> PII detectado e bloqueado.");
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle className="flex items-center text-[#4e4ea8]"><Shield className="h-5 w-5 mr-2" /> Políticas de Detecção</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="piiDetection">Detecção de Informações Pessoais (PII)</Label>
                        <Switch id="piiDetection" checked={settings.piiDetection} onCheckedChange={(v) => setSettings({...settings, piiDetection: v})} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="secretDetection">Detecção de Segredos e Credenciais (API Keys)</Label>
                        <Switch id="secretDetection" checked={settings.secretDetection} onCheckedChange={(v) => setSettings({...settings, secretDetection: v})} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="jailbreakProtection">Proteção contra Tentativas de Jailbreak</Label>
                        <Switch id="jailbreakProtection" checked={settings.jailbreakProtection} onCheckedChange={(v) => setSettings({...settings, jailbreakProtection: v})} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="flex items-center text-[#FF6B35]"><Lock className="h-5 w-5 mr-2" /> Lista de Palavras Bloqueadas</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <Label htmlFor="blockedKeywords">Palavras-chave (separadas por vírgula)</Label>
                    <Textarea 
                        id="blockedKeywords" 
                        rows={3} 
                        value={settings.blockedKeywords} 
                        onChange={(e) => setSettings({...settings, blockedKeywords: e.target.value})} 
                        placeholder="Ex: ilegal, spam, fraude"
                    />
                    <div className="flex items-center justify-between">
                        <Label htmlFor="enforcementLevel">Nível de Aplicação</Label>
                        <select id="enforcementLevel" value={settings.enforcementLevel} onChange={(e) => setSettings({...settings, enforcementLevel: e.target.value})} className="flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="strict">Rigoroso (Bloqueio Imediato)</option>
                            <option value="moderate">Moderado (Aviso e Sanitização)</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="flex items-center text-[#0ca7d2]"><TestTube className="h-5 w-5 mr-2" /> Teste de Políticas</CardTitle></CardHeader>
                <CardContent>
                    <Button onClick={handleTest} variant="outline">
                        <TestTube className="h-4 w-4 mr-2" /> Simular Tentativa de Bloqueio
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B35] hover:bg-[#e55f30]">
                    <Save className="h-4 w-4 mr-2" /> {isSaving ? 'Salvando...' : 'Salvar Guardrails'}
                </Button>
            </div>
        </div>
    );
};

export default GuardrailsTab;