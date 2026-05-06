# Guia Completo: Deploy do Calculo Nitrogênio em Vercel

## O que é Vercel?

Vercel é uma plataforma gratuita que hospeda aplicações web. Seu app ficará disponível 24/7 em um link permanente que você pode compartilhar com qualquer pessoa.

---

## Passo 1: Criar Conta no Vercel

1. Acesse **[vercel.com](https://vercel.com)**
2. Clique em **"Sign Up"** (canto superior direito)
3. Escolha uma opção para criar conta:
   - **GitHub** (recomendado - mais fácil)
   - **GitLab**
   - **Bitbucket**
   - **Email**

Se escolher GitHub:
- Clique em **"Continue with GitHub"**
- Faça login na sua conta GitHub (ou crie uma se não tiver)
- Autorize o Vercel a acessar suas repositórios
- Pronto! Sua conta está criada

---

## Passo 2: Preparar o Código para Upload

Você tem **3 opções**:

### Opção 2A: Upload Manual (Mais Rápido - Recomendado)

1. Baixe o arquivo ZIP do projeto:
   - Vá para a pasta do projeto
   - Clique em "Download as ZIP" (no painel de gerenciamento)
   - Ou use este comando no terminal: `cd /home/ubuntu/calculo-nitrogenio && zip -r calculo-nitrogenio.zip . -x "node_modules/*" ".git/*"`

2. Extraia o ZIP em seu computador

3. Você vai usar a pasta `dist/` que já preparei (contém o app pronto para usar)

### Opção 2B: GitHub (Melhor para Atualizações Futuras)

1. Crie um repositório no GitHub:
   - Acesse [github.com/new](https://github.com/new)
   - Nome: `calculo-nitrogenio`
   - Descrição: "Aplicativo para calcular volume de nitrogênio em tubulações"
   - Clique em **"Create repository"**

2. Siga as instruções do GitHub para fazer upload do código

### Opção 2C: Conectar Repositório Existente

Se você já tem um repositório Git, pule para o Passo 3

---

## Passo 3: Fazer Deploy em Vercel

### Método A: Deploy Manual (Mais Simples)

1. Acesse **[vercel.com/new](https://vercel.com/new)**

2. Clique em **"Deploy"** (botão azul)

3. Escolha **"Other"** → **"Upload Files"**

4. Arraste a pasta **`dist/`** (que já preparei) para a área de upload
   - OU clique em "Select Files" e escolha todos os arquivos dentro de `dist/`

5. Preencha os campos:
   - **Project Name**: `calculo-nitrogenio`
   - **Framework**: `Other` (deixe como está)

6. Clique em **"Deploy"**

7. Aguarde 30-60 segundos

8. Você verá uma mensagem **"Congratulations!"** com seu link permanente!

### Método B: Deploy via GitHub (Automático)

1. Acesse **[vercel.com/new](https://vercel.com/new)**

2. Clique em **"Import Git Repository"**

3. Cole a URL do seu repositório GitHub:
   - Exemplo: `https://github.com/seu-usuario/calculo-nitrogenio`

4. Clique em **"Import"**

5. Configure o projeto:
   - **Project Name**: `calculo-nitrogenio`
   - **Framework**: `Other`
   - **Root Directory**: deixe em branco
   - **Build Command**: deixe em branco (não precisa fazer build)
   - **Output Directory**: `dist`

6. Clique em **"Deploy"**

7. Aguarde o deploy terminar (2-3 minutos)

8. Você receberá um link como: `https://calculo-nitrogenio-xxx.vercel.app`

---

## Passo 4: Acessar Seu App

Após o deploy, você receberá um link permanente. Exemplo:

```
https://calculo-nitrogenio-abc123.vercel.app
```

**Este link funciona:**
- ✅ 24/7, sem precisar manter nada aberto
- ✅ Em qualquer navegador (desktop, tablet, mobile)
- ✅ Offline (depois de instalar como app)
- ✅ Pode ser compartilhado com qualquer pessoa

---

## Passo 5: Instalar como App (Opcional)

Depois que tiver o link, você pode instalar o app em seu dispositivo:

### No Chrome/Edge (Desktop ou Mobile):
1. Acesse o link do seu app
2. Clique no ícone de instalação (canto superior direito)
3. Clique em **"Install"**
4. O app aparecerá na sua tela inicial

### No Safari (iPhone/iPad):
1. Acesse o link do seu app
2. Toque em **Compartilhar** (ícone de seta)
3. Toque em **"Adicionar à Tela Inicial"**
4. O app aparecerá na sua tela inicial

### No Firefox:
1. Acesse o link do seu app
2. Clique no menu ⋮ (três linhas)
3. Clique em **"Instalar aplicativo"**
4. O app aparecerá na sua tela inicial

---

## Troubleshooting

### "Erro ao fazer upload"
- Certifique-se de que está uploadando a pasta **`dist/`**, não a pasta raiz
- Tente novamente ou use o Método B (GitHub)

### "App não carrega"
- Aguarde 2-3 minutos após o deploy
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Tente em outro navegador

### "Offline não funciona"
- Instale como app (veja Passo 5)
- O app funcionará offline após a primeira visita

---

## Próximos Passos

Depois que seu app estiver online:

1. **Compartilhe o link** com colegas ou clientes
2. **Instale como app** em seus dispositivos
3. **Adicione recursos** como histórico de cálculos, compartilhamento, etc.

---

## Dúvidas?

Se tiver problemas, entre em contato ou tente:
- Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
- Suporte Vercel: [vercel.com/support](https://vercel.com/support)
