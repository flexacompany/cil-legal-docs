
-- Create documents table to store user documents
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  subtype TEXT,
  variant TEXT,
  content JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create document templates table
CREATE TABLE public.document_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  variant TEXT,
  template_content JSONB NOT NULL,
  fields JSONB NOT NULL, -- Field definitions for the template
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY "Users can view their own documents" 
  ON public.documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
  ON public.documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON public.documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
  ON public.documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for document templates (public read access)
CREATE POLICY "Anyone can view document templates" 
  ON public.document_templates 
  FOR SELECT 
  USING (true);

-- Insert sample document templates
INSERT INTO public.document_templates (name, category, subcategory, variant, template_content, fields) VALUES
-- Contratos de Aluguel
('Contrato de Aluguel Residencial com Fiador', 'contrato_aluguel', 'residencial', 'com_fiador', 
  '{"sections": [{"title": "CONTRATO DE LOCAÇÃO RESIDENCIAL", "content": "Entre as partes..."}]}',
  '{"locador": {"type": "object", "required": true}, "locatario": {"type": "object", "required": true}, "fiador": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Contrato de Aluguel Residencial sem Fiador', 'contrato_aluguel', 'residencial', 'sem_fiador',
  '{"sections": [{"title": "CONTRATO DE LOCAÇÃO RESIDENCIAL", "content": "Entre as partes..."}]}',
  '{"locador": {"type": "object", "required": true}, "locatario": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Contrato de Aluguel Comercial com Fiador', 'contrato_aluguel', 'comercial', 'com_fiador',
  '{"sections": [{"title": "CONTRATO DE LOCAÇÃO COMERCIAL", "content": "Entre as partes..."}]}',
  '{"locador": {"type": "object", "required": true}, "locatario": {"type": "object", "required": true}, "fiador": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Contrato de Aluguel Comercial sem Fiador', 'contrato_aluguel', 'comercial', 'sem_fiador',
  '{"sections": [{"title": "CONTRATO DE LOCAÇÃO COMERCIAL", "content": "Entre as partes..."}]}',
  '{"locador": {"type": "object", "required": true}, "locatario": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Contrato de Aluguel de Veículo para Aplicativos', 'contrato_aluguel', 'veiculo', 'uso_aplicativos',
  '{"sections": [{"title": "CONTRATO DE LOCAÇÃO DE VEÍCULO PARA APLICATIVOS", "content": "Entre as partes..."}]}',
  '{"locador": {"type": "object", "required": true}, "locatario": {"type": "object", "required": true}, "veiculo": {"type": "object", "required": true}}'),

('Contrato de Aluguel de Veículo Convencional', 'contrato_aluguel', 'veiculo', 'uso_convencional',
  '{"sections": [{"title": "CONTRATO DE LOCAÇÃO DE VEÍCULO", "content": "Entre as partes..."}]}',
  '{"locador": {"type": "object", "required": true}, "locatario": {"type": "object", "required": true}, "veiculo": {"type": "object", "required": true}}'),

-- Contratos de Compra e Venda
('Contrato de Compra e Venda de Imóvel Convencional', 'contrato_compra_venda', 'imovel', 'convencional',
  '{"sections": [{"title": "CONTRATO DE COMPRA E VENDA DE IMÓVEL", "content": "Entre as partes..."}]}',
  '{"vendedor": {"type": "object", "required": true}, "comprador": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Contrato de Compra e Venda de Imóvel Rural', 'contrato_compra_venda', 'imovel', 'rural',
  '{"sections": [{"title": "CONTRATO DE COMPRA E VENDA DE IMÓVEL RURAL", "content": "Entre as partes..."}]}',
  '{"vendedor": {"type": "object", "required": true}, "comprador": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Instrumento Particular de Compromisso de Venda e Compra de Imóvel', 'contrato_compra_venda', 'imovel', 'compromisso_particular',
  '{"sections": [{"title": "INSTRUMENTO PARTICULAR DE COMPROMISSO DE VENDA E COMPRA", "content": "Entre as partes..."}]}',
  '{"vendedor": {"type": "object", "required": true}, "comprador": {"type": "object", "required": true}, "imovel": {"type": "object", "required": true}}'),

('Contrato de Compra e Venda de Veículo Convencional', 'contrato_compra_venda', 'veiculo', 'convencional',
  '{"sections": [{"title": "CONTRATO DE COMPRA E VENDA DE VEÍCULO", "content": "Entre as partes..."}]}',
  '{"vendedor": {"type": "object", "required": true}, "comprador": {"type": "object", "required": true}, "veiculo": {"type": "object", "required": true}}'),

('Contrato de Compra e Venda de Veículo com Reserva de Domínio', 'contrato_compra_venda', 'veiculo', 'reserva_dominio',
  '{"sections": [{"title": "CONTRATO DE COMPRA E VENDA DE VEÍCULO COM RESERVA DE DOMÍNIO", "content": "Entre as partes..."}]}',
  '{"vendedor": {"type": "object", "required": true}, "comprador": {"type": "object", "required": true}, "veiculo": {"type": "object", "required": true}}'),

('Contrato de Compra e Venda de Veículo com Gravame de Alienação Fiduciária', 'contrato_compra_venda', 'veiculo', 'alienacao_fiduciaria',
  '{"sections": [{"title": "CONTRATO DE COMPRA E VENDA DE VEÍCULO COM ALIENAÇÃO FIDUCIÁRIA", "content": "Entre as partes..."}]}',
  '{"vendedor": {"type": "object", "required": true}, "comprador": {"type": "object", "required": true}, "veiculo": {"type": "object", "required": true}}'),

-- Contratos de Prestação de Serviço
('Contrato de Prestação de Serviços Advocatícios - Escritório', 'contrato_prestacao_servico', 'advogado', 'escritorio',
  '{"sections": [{"title": "CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS", "content": "Entre as partes..."}]}',
  '{"contratante": {"type": "object", "required": true}, "contratado": {"type": "object", "required": true}, "servicos": {"type": "object", "required": true}}'),

('Contrato de Prestação de Serviços Advocatícios - Particular', 'contrato_prestacao_servico', 'advogado', 'particular',
  '{"sections": [{"title": "CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS", "content": "Entre as partes..."}]}',
  '{"contratante": {"type": "object", "required": true}, "contratado": {"type": "object", "required": true}, "servicos": {"type": "object", "required": true}}'),

('Contrato de Prestação de Serviços Educacionais - Instituição', 'contrato_prestacao_servico', 'educacional', 'instituicao',
  '{"sections": [{"title": "CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS", "content": "Entre as partes..."}]}',
  '{"contratante": {"type": "object", "required": true}, "contratado": {"type": "object", "required": true}, "servicos": {"type": "object", "required": true}}'),

('Contrato de Prestação de Serviços Educacionais - Particular', 'contrato_prestacao_servico', 'educacional', 'particular',
  '{"sections": [{"title": "CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS", "content": "Entre as partes..."}]}',
  '{"contratante": {"type": "object", "required": true}, "contratado": {"type": "object", "required": true}, "servicos": {"type": "object", "required": true}}'),

('Contrato de Prestação de Serviços Diversos', 'contrato_prestacao_servico', 'diversos', 'geral',
  '{"sections": [{"title": "CONTRATO DE PRESTAÇÃO DE SERVIÇOS", "content": "Entre as partes..."}]}',
  '{"contratante": {"type": "object", "required": true}, "contratado": {"type": "object", "required": true}, "servicos": {"type": "object", "required": true}}'),

-- Procurações
('Procuração Particular para Fins Específicos', 'procuracao', 'particular', 'fins_especificos',
  '{"sections": [{"title": "PROCURAÇÃO PARA FINS ESPECÍFICOS", "content": "Pelo presente instrumento..."}]}',
  '{"outorgante": {"type": "object", "required": true}, "outorgado": {"type": "object", "required": true}, "poderes": {"type": "object", "required": true}}'),

('Procuração Particular Geral', 'procuracao', 'particular', 'geral',
  '{"sections": [{"title": "PROCURAÇÃO GERAL", "content": "Pelo presente instrumento..."}]}',
  '{"outorgante": {"type": "object", "required": true}, "outorgado": {"type": "object", "required": true}, "poderes": {"type": "object", "required": true}}'),

('Procuração Ad Judicia', 'procuracao', 'particular', 'ad_judicia',
  '{"sections": [{"title": "PROCURAÇÃO AD JUDICIA", "content": "Pelo presente instrumento..."}]}',
  '{"outorgante": {"type": "object", "required": true}, "outorgado": {"type": "object", "required": true}, "poderes": {"type": "object", "required": true}}'),

('Procuração Particular com Poderes Especiais', 'procuracao', 'particular', 'poderes_especiais',
  '{"sections": [{"title": "PROCURAÇÃO COM PODERES ESPECIAIS", "content": "Pelo presente instrumento..."}]}',
  '{"outorgante": {"type": "object", "required": true}, "outorgado": {"type": "object", "required": true}, "poderes": {"type": "object", "required": true}}');
