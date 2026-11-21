# TEN TRACKS

Protótipo jogável de runner 3D em dez trilhos, feito com Three.js e Vite. Não há backend: recordes, moedas, cosméticos e configurações ficam no `localStorage` do navegador.

## Executar

```sh
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite. Use ←/→ (ou A/D) para trocar de trilho, ↑/W para pular, ↓/S para deslizar, espaço para ativar o escudo uma vez por corrida e Esc para pausar. Em telas pequenas, use os botões na tela. O modo impossível não permite escudo.

`npm test` verifica geração determinística, rotas reservadas e carregamento de progresso. `npm run build` cria a versão estática em `dist/`.

## Pistas e modos

Cada linha procedural reserva um trilho livre adjacente ao da linha anterior. As linhas têm espaçamento mínimo de 18 metros e a velocidade é limitada a 34 m/s; a rota reservada não depende de pulo ou deslize. A semente do desafio diário usa a data UTC, compartilhada entre jogadores. Os demais modos geram uma nova semente por corrida. Os recordes são separados por modo.

## GitHub Pages

O workflow `.github/workflows/deploy.yml` testa, compila e publica alterações em `main` ou por execução manual. Em **Settings → Pages**, selecione **GitHub Actions** como origem. O build no Actions usa `/Ten-Tracks/` como base; ajuste `vite.config.js` se o repositório tiver outro nome. A publicação depende da configuração do repositório e não é executada localmente.

## Escopo atual

Esta é uma base jogável, não a implementação integral da visão de projeto: há um cenário futurista, sete modelos de obstáculos, escudo, moedas e três visuais. Música dinâmica, outros cenários e habilidades, obstáculos realmente móveis, pooling/instancing e testes automatizados de interação e desempenho ainda não estão implementados. A validação procedural garante uma rota livre conservadora entre linhas, mas não simula todas as ações possíveis do jogador.
