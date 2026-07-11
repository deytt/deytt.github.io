# deytt.github.io

Portfólio e marca pessoal de [David Cerqueira](https://deytt.github.io/) — Mobile Software Engineer especialista em Android/Kotlin e Flutter no setor financeiro.

## Sobre o site

Site estático bilíngue (PT-BR / EN) hospedado no GitHub Pages. Design premium inspirado em Linear, Vercel e Raycast.

**Seções:**
- Hero com caricatura editorial
- Sobre mim
- Especialidades (Android, Flutter, Arquitetura, Fintech)
- Stack agrupada por categoria
- Trajetória profissional e formação
- Filosofia
- Contato

## Estrutura

```
.
├── index.html          # Única página (HTML semântico + bilíngue)
├── css/
│   └── main.css        # Design system completo com tokens CSS
├── js/
│   └── main.js         # Language toggle, nav scroll, mobile menu
├── assets/
│   ├── caricature.png  # Ilustração hero (V2)
│   ├── photo.png       # Foto real (seção Sobre)
│   ├── favicon.svg     # Monograma DC
│   ├── github.svg
│   ├── linkedin.svg
│   └── instagram.svg
└── README.md
```

## Desenvolvimento local

Nenhuma dependência ou build step necessário. Abra o `index.html` diretamente no navegador, ou use um servidor local:

```bash
# Python 3
python3 -m http.server 3000

# Node.js (npx)
npx serve .

# VS Code
# Extensão "Live Server" → clique direito em index.html → Open with Live Server
```

## Deploy

Push para a branch `master` publica automaticamente em [deytt.github.io](https://deytt.github.io/) via GitHub Pages.

## Contato

- [LinkedIn](https://www.linkedin.com/in/dcerquei/)
- [GitHub](https://github.com/deytt)
- [Instagram](https://www.instagram.com/deytt/)
