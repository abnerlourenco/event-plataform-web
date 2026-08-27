# Especificacao de Requisitos da Aplicacao Web

## 1. Objetivo

A aplicacao web deve oferecer uma interface para descoberta de eventos, compra
de ingressos, gerenciamento de eventos e validacao na portaria, consumindo a
API do projeto `event-plataform-server`.

## 2. Perfis de usuario

- `CLIENT`: consulta eventos, realiza compras e acessa os proprios ingressos.
- `ORGANIZER`: importa filmes e gerencia os proprios eventos.
- `GATEKEEPER`: valida ingressos na portaria.

## 3. Requisitos funcionais

### RF01 - Cadastro e autenticacao

- Deve ser possivel criar uma conta com nome, e-mail e senha.
- Deve ser possivel entrar e sair da aplicacao.
- A aplicacao deve preservar a sessao do usuario autenticado.
- Mensagens de validacao e de erro da API devem ser apresentadas de forma
	clara.

### RF02 - Catalogo de eventos

- Visitantes e usuarios autenticados devem conseguir listar os eventos
	disponiveis.
- Deve ser possivel buscar eventos por titulo e filtrar por data.
- Deve ser possivel visualizar os detalhes de um evento, incluindo filme,
	local, data, horario, capacidade, preco e disponibilidade de assentos.
- A listagem deve possuir estados de carregamento, vazio e erro.

### RF03 - Gestao de eventos

- Organizadores devem conseguir importar um filme do catalogo externo.
- Organizadores devem conseguir cadastrar um evento com filme, local, data,
	horario, capacidade e preco.
- Organizadores devem conseguir visualizar os eventos cadastrados por eles.
- A interface deve restringir as acoes de gestao aos perfis autorizados.

### RF04 - Reserva e checkout

- Usuarios autenticados devem conseguir selecionar um ou mais assentos
	disponiveis.
- A interface deve diferenciar assentos disponiveis, selecionados,
	reservados e vendidos.
- Deve ser possivel revisar o pedido antes da confirmacao.
- Deve ser possivel simular pagamento aprovado, recusado ou cancelado.
- O resultado da operacao deve ser informado ao usuario e o estado da compra
	deve ser atualizado.

### RF05 - Meus ingressos e compartilhamento

- Usuarios autenticados devem conseguir consultar seus ingressos.
- Deve ser possivel abrir os detalhes de um ingresso com QR Code, codigo hash,
	evento e status.
- Deve ser possivel gerar ou copiar um link publico de compartilhamento do
	ingresso.
- A pagina publica do ingresso nao deve exigir autenticacao.

### RF06 - Validacao na portaria

- Porteiros devem conseguir ler o QR Code usando a camera do dispositivo.
- Deve ser possivel informar manualmente o codigo hash do ingresso.
- A interface deve exibir o resultado da validacao e o motivo de uma eventual
	recusa.
- A tela de portaria deve estar disponivel somente para usuarios autorizados.

## 4. Regras de negocio refletidas na interface

- Visitantes podem consultar eventos, mas precisam estar autenticados para
	reservar, comprar ou consultar seus ingressos.
- Somente `ORGANIZER` podem importar filmes e criar eventos.
- Somente `GATEKEEPER` podem validar ingressos.
- Assentos com status `RESERVED` ou `SOLD` nao podem ser selecionados.
- Um ingresso com status `USED` deve ser tratado como ja utilizado.

## 5. Requisitos nao funcionais

- A aplicacao deve ser responsiva e utilizavel em desktop e dispositivos
	moveis.
- A navegacao deve ser acessivel por teclado, com foco visivel, labels em
	campos e contraste adequado.
- Componentes interativos devem informar estados de carregamento, sucesso e
	erro sem causar mudancas inesperadas no layout.
- Dados sensiveis nao devem ser exibidos em URLs, logs do navegador ou
	mensagens de erro.
- A aplicacao deve tratar expiracao de sessao e respostas de erro da API de
	forma consistente.

## 6. Stack e padroes de implementacao

- **Framework:** Next.js com TypeScript.
- **Componentes:** shadcn/ui, mantendo os componentes acessiveis e
	customizaveis no proprio projeto.
- **Estilos:** Tailwind CSS para estilos utilitarios e responsividade.
- **Integracao:** consumo dos endpoints REST de
	`event-plataform-server` por uma camada centralizada de cliente HTTP.
- **Arquitetura de interface:** paginas e layouts do Next.js, componentes
	reutilizaveis e componentes de dominio separados dos componentes visuais.
- **Configuracao:** URLs e demais configuracoes de ambiente devem ser lidas
	de variaveis `NEXT_PUBLIC_*` quando forem necessarias no navegador.

## 7. Qualidade e automacao

- O projeto deve usar **Husky** para executar verificacoes automaticamente
	antes de cada commit.
- O hook `pre-commit` deve executar, nesta ordem:

	1. lint;
	2. Prettier em modo de verificacao.

- O lint deve bloquear o commit quando houver erros de codigo ou TypeScript.
- O Prettier deve bloquear o commit quando existirem arquivos fora do padrao
	de formatacao.
- Os comandos executados pelo hook tambem devem estar disponiveis nos scripts
	do `package.json`, para uso local e na CI.
- A CI deve executar as mesmas verificacoes do hook para evitar que commits
	sem validacao cheguem ao repositorio.

## 8. Criterios de aceite

- Os fluxos de cadastro, login, consulta de eventos, compra, consulta de
	ingressos e validacao respeitam os perfis e regras definidos neste documento.
- Todas as telas principais possuem estados de carregamento, vazio, erro e
	sucesso quando aplicavel.
- A aplicacao funciona nos principais tamanhos de tela sem perda de
	funcionalidade.
