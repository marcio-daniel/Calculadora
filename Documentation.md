### Especificação Funcional do Código Fornecido

O código fornecido implementa funções que simulam uma calculadora interativa com capacidade de realizar cálculos matemáticos usando manipulação de DOM, eventos e lógica de programação. Ele utiliza funcionalidades de JavaScript puro para gerenciar e operar a lógica da calculadora, atualizar displays de equações e resultados, além de implementar cálculos complexos como raiz quadrada, fatorial e operações com parênteses.

---

#### Funcionalidades Principais da Implementação

1. **Manipulação de Interface do Usuário**:
   - Integração com elementos HTML (`.container`, `#eq`, `.display_num`) para controle do estado da calculadora.
   - Atualização dinâmica de displays para representar equações e resultados das operações realizadas pelo usuário.

2. **Manipulação de Eventos e Interações**:
   - Uso de eventos de clique nos botões da calculadora para iniciar ações de cálculos.
   - Verificação de tipos de teclas acionadas e atualização do estado interno baseado no contexto da interação.
   - Diferenciação entre teclas numéricas, operadores e funções especiais.

3. **Operações Matemáticas**:
   - Suporte a múltiplos operadores matemáticos básicos: adição (`+`), subtração (`-`), multiplicação (`*`), divisão (`/`).
   - Suporte a funções avançadas, incluindo:
     - Raiz quadrada (`√`).
     - Potenciação (`^` e `²`).
     - Fatorial (`n!`).
     - Percentual.
   - Implementação de equações com parênteses para cálculos mais elaborados.

4. **Gestão de Estados**:
   - Armazenamento de informação sobre o tipo de tecla previamente clicado (`number`, `operator`, `paren`).
   - Controle de abertura e fechamento de parênteses.
   - Gestão da ordem de operações matemáticas para evitar erros em equações complexas.

5. **Validação e Tratamento de Erros**:
   - Identificação de situações de "Estouro", exibindo mensagens apropriadas se o resultado exceder os limites estipulados.
   - Mensagem de erro para operações inválidas (e.g., "Equação inválida").
   - Tratamento para evitar erros de sintaxe em equações com desequilíbrio de parênteses.

6. **Funções Auxiliares**:
   - **`clear()`**: Reseta os displays e os valores armazenados no dataset, retornando a calculadora ao estado inicial.
   - **`factorialize()`**: Calcula o fatorial de um número de forma recursiva.
   - **`isNumber()`**: Verifica se um valor é um número válido.
   - **`calcula()`**: Realiza as operações matemáticas básicas entre dois números com um operador específico.
   - **`achaResult()` e `auxAchaResult()`**: Calcula o resultado de equações complexas com parênteses, resolvendo as partes internas em sequência correta.
   - **`existOp()`**: Identifica o índice do próximo operador matemático na string da equação.
   - **`achaUltimoParen()`**: Localiza o índice do último parêntese aberto em uma substring.

---

#### Diagrama de Funções e Fluxo do Código

##### 1. Diagrama de Fluxo das Interações do Usuário
```
                            +---------------------+
                            | Clique no botão     |
                            +---------------------+
                                     |
                           [Verifica ação do botão]
                           /                         \
                          /                           \
    +------------------------+       +------------------------+
    | Tecla de número        |       | Tecla de operador      |
    +------------------------+       +------------------------+
            |                                  |
+---------------------------+    +--------------------------+
| Atualiza display de número|    | Atualiza equação no      |
| e armazena valores no     |    | display da equação.      |
| dataset.                  |    |                         |
+---------------------------+    +--------------------------+
            |                                  |
+---------------------------+          +-------------------------+
| Ação associada            |          | Armazena número atual  |
| ao evento é realizada.    |          | e tipo de operador.    |
+---------------------------+          +-------------------------+
```

---

##### 2. Diagrama de Fluxo de Resolução de Equações com Parênteses
```
+-----------------------------------+
| Entrada: Eq. com parênteses       |
+-----------------------------------+
            |
  +--------------------+
  | Verifica parênteses |
  +--------------------+
            |
  +----------------------------+
  | Substring do parêntese mais |   
  | interno identificada        |
  +----------------------------+
            |
+--------------------------------------+
| Resolve conteúdo dentro do parêntese |
+--------------------------------------+
            |
+-------------------------------------+
| Equação é atualizada com resultado. |
+-------------------------------------+
            |
+--------------------------+
| Verifica próximos        |
| parênteses e outras      |
| operações.               |
+--------------------------+
```

---

##### 3. Diagrama de Estados de Operação
```
+----------------------------+
| Estado inicial da calculadora |
+----------------------------+
            |
+-----------------------------+
| Número digitado -> Estado   |
| "number", atualizado no      |
| display de número.           |
+-----------------------------+
            |
     +------------+
     | Operador   |
     +------------+
            |
+-------------------------------------+
| Atualiza equação, troca para estado |
| "operator", armazena valores no     |
| dataset e executa operação.         |
+-------------------------------------+
            |
+------------------------------+
| Parêntese aberto -> Estado   |
| "paren", prepara cálculo     |
| de equação complexa.         |
+------------------------------+
            |
+-----------------------------+
| Conclusão e resultado final |
+-----------------------------+
```

---

#### Considerações Adicionais

- A interface da calculadora é manipulável via eventos de clique em botões HTML, com base na captura de informações de `data-action` atribuídas a cada botão da interface.
- A implementação prioriza a precisão dos cálculos ao levar em consideração os limites numéricos (\(-9999999999999 < x < 9999999999999\)) e arredondando valores em operações não inteiramente equivalentes, como divisões e raízes.
- O código suporta até 7 níveis de parênteses abertos simultaneamente, com controle das quantidades de abertura e fechamento realizados pelo usuário.
- Cada operação é tratada dentro de suas próprias condições, utilizando o dataset da calculadora para armazenar estados intermediários e garantir a continuidade das equações.

Caso sejam necessárias mais especificações ou explicações sobre o funcionamento detalhado de alguma função ou componente, entre em contato.