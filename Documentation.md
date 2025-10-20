### Especificação Funcional do Código

O código fornecido é uma implementação de lógica para uma aplicação de calculadora utilizando JavaScript. Ele inclui funcionalidades que permitem interações com elementos DOM, manipulação de dados, operações matemáticas básicas e avançadas, gerenciando estados e inputs do usuário, além de lógica estruturada para cálculos encadeados com suporte a parênteses. A seguir está a especificação funcional detalhada do sistema.

---

### Funcionalidades do Código

#### 1. **Estrutura de Elementos DOM**
    - A estrutura da calculadora compreende os seguintes elementos principais no DOM:
        - `container`: Identifica o contêiner principal da calculadora.
        - `keyboard`: Representa os botões de entrada (teclado) para números e operadores.
        - `displayEq`: Exibe a equação composta pelo usuário.
        - `displayNumber`: Mostra o número atual ou o resultado do cálculo.

#### 2. **Gerenciamento de Teclado e Eventos**
    - A partir do elemento `keyboard`, o código utiliza eventos de clique para capturar interações do usuário.
    - Botões clicados são identificados via `dataset.action`, permitindo determinar se o botão representa um número, operador, ou funcionalidade específica.
    - Suporte a diferentes tipos de entrada:
        - **Números**: Adição direta ao display, com validação para evitar quantidade excessiva de caracteres.
        - **Operadores**: Atualização dos estados internos e composição da equação visual.
        - **Funções especiais**: Inclui comportamentos como limpar valores, calcular porcentagem, adicionar pontos decimais, abrir ou fechar parênteses.

#### 3. **Estados Internos**
    - Utiliza `dataset` para armazenar os estados e valores necessários para os cálculos:
        - `previousKeyType`: Guarda o tipo da última tecla pressionada.
        - `previousOperatorType`: Armazena o operador previamente utilizado.
        - `previousNumber` e `laterNumber`: Manipulam os números envolvidos em operações matemáticas.
        - Estados específicos para operações com parênteses:
            - `eqComp`: Indica que uma equação composta está em construção.
            - `countOpenParen` e `countCloseParen`: Rastreamentos de parênteses abertos e fechados.

#### 4. **Operações Matemáticas**
    - Suporte a operações básicas e avançadas:
        - Multiplicação, Divisão, Adição e Subtração.
        - Raiz quadrada: Calculada utilizando `Math.sqrt`.
        - Exponenciação: Implementada com `Math.pow`.
        - Expoente ao quadrado: Utiliza `Math.pow` com expoente fixo.
        - Fatorial: Calculado com uma função recursiva (`factorialize`).
    - Validação de limites numéricos para evitar resultados fora da faixa permitida (-9999999999999 a 9999999999999).

#### 5. **Lógica para Operações Encadeadas**
    - Permite cálculos com parênteses compondo equações complexas:
        - Identifica o último parêntese aberto usando a função `achaUltimoParen`.
        - Calcula expressões dentro de parênteses primeiro, utilizando `auxAchaResult`, seguido por sua substituição na equação principal.
        - A função `achaResult` resolve toda equação composta ao iterar pelas expressões até que nenhum parêntese ou operador remanescente exista.

#### 6. **Funções Utilitárias**
    - **atualizaDisplayEq**: Atualiza o display da equação com operadores e valores.
    - **clear**: Limpa todos os estados internos, resets no display e na equação.
    - **factorialize**: Calcula o fatorial de um número.
    - **calcula**: Realiza computação com operador identificado e dois valores.
    - **existOp**: Verifica se há operador na string da equação.
    - **achaUltimoParen**: Localiza o índice do último parêntese aberto em uma substring.

#### 7. **Comportamentos Adicionais**
    - Suporte ao cálculo de porcentagens:
        - Com base no valor prévio ou como porcentagem relativa.
    - Adição de ponto decimal:
        - Garantia de um único ponto por número.
    - Mensagens de erro e validação:
        - Exibe "Estouro" para indicar limites excedidos.
        - Invalida equações com parênteses incorretos, exibindo "Equação inválida".

#### 8. **Gerenciamento de Estados e Exibição**
    - Transição fluida entre entradas e combinações de operadores, números e funções especiais.
    - Atualização em tempo real do conteúdo de `displayEq` e `displayNumber`.

---

### Diagramas de Fluxo

#### 1. Interações do Usuário com a Interface
```plaintext
+---------------+
|   Clique no   |----> Verifica tipo do botão
| Botão Teclado |      (Número, Operador, Função)
+---------------+              |
                                v
  +-----------------------------+
  | Atualiza estado (dataset): |
  | - Tipo de tecla pressionada |
  | - Números e valores         |
  +-----------------------------+
```

#### 2. Construção de Equações Complexas
```plaintext
+-----------------------------+
|  Entrada de parênteses ou   |
| operadores para compor eq.  |<---+
+-----------------------------+    |
        |                             |
        v                             |
+-----------------------------+       |
| Atualização de estados para |       |
| contagem de parênteses      |       |
+-----------------------------+       |
        |                             v
        +------------------------------+
        | Análise e cálculo recursivo  |
        | para resolver subexpressões  |
        +------------------------------+
```

#### 3. Realização de Cálculos
```plaintext
+------------------------------+
| Ação gatilho de cálculo      |
| (Igual/Operador)             |
+------------------------------+
        |
        v
+------------------------------+
|  Verifica validação de       |
|  dados e operação:           |
|  - Operações Matemáticas     |
|  - Limites Numéricos         |
+------------------------------+
        |
        v
+------------------------------+
| Atualiza os displays         |
| com os resultados            |
+------------------------------+
```

---

### Implementação Baseada nos Estados Internos

Este script faz uso extensivo de estados armazenados em `container.dataset`, garantindo rastreamento preciso das entradas do usuário e do progresso dos cálculos. A lógica presente aborda casos de uso comuns e sofisticados, proporcionando uma experiência de uso intuitiva para o usuário. Todas as funções e metodologias do código seguem uma abordagem modular, maximizando a clareza e flexibilidade.

O sistema é desenvolvido para operar dentro de um navegador moderno, sem dependências externas, e com suporte para manipulação dinâmica de DOM. Ele utiliza os operadores matemáticos e a biblioteca padrão de JavaScript (`Math`) para executar cálculos avançados e complexos.

Essa documentação apresenta a especificação definitiva para o código recebido.