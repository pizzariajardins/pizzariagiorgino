# Prévia visual Giorgino

Abra `previa.html` no navegador. A prévia também pode ser servida localmente. A página publicada `index.html` foi preservada.

## Auditoria inicial

- Base examinada: commit `96eb9bf364ed5583a9f31b932c6b04d2b25c1311`, seis commits no histórico.
- Página inicial existente: aviso provisório, sem referências às imagens.
- Logomarca oficial: `assets/logos/logo preta.jpeg`, usada integralmente e sem alterações.
- Oito arquivos de imagem da raiz possuem cópias idênticas em `assets/logos` (mesmos identificadores de conteúdo), exceto `Logo redondo.jpg`, ainda somente na raiz. Nenhum original foi removido.
- A imagem de risoto está em `assets/logos`, embora seja fotografia com arte. A prévia preserva o arquivo e a arte completa.
- Não há cardápio, fotos do ambiente, CSS ou JavaScript anteriores.
- Nenhum arquivo AGENTS.md foi encontrado na árvore do repositório.

## Proposta

Preto, branco e tons neutros, tipografia editorial, marca oficial em destaque. Seções de história, cardápio, fotos, restaurante e contato. Navegação móvel, janelas de contato e ampliação da imagem. Salão, retirada e delivery possuem acessos separados de demonstração; ainda não recebem pedidos.

## Pendências antes da versão definitiva

Confirmar WhatsApp e URL do iFood; validar telefone atual (a arte antiga contém números, que não foram adotados automaticamente). Fornecer cardápio oficial, endereço, horários, história e fotografias reais. Validar autorizações de imagens de clientes. Substituir os controles textuais de demonstração pelos ícones oficiais aprovados dos canais. Inserir mapa e metadados finais após confirmação do endereço e aprovação visual.

A prévia tem `noindex`. Nenhuma alteração no DNS ou na publicação foi realizada. A organização final das pastas e o cardápio operacional ainda serão concluídos na etapa de implementação definitiva.

## Verificação

Sintaxe JavaScript verificada com Node. A inspeção visual automática foi bloqueada pela política da ferramenta de navegador; responsividade e interações ainda precisam de confirmação visual no navegador.
