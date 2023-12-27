Desafio da SmartFit implementando o que foi proposto, utilizando Angular.

### Funcionalidades
- Carrega informações das unidades do arquivo JSON [locations.json](https://test-frontend-developer.s3.amazonaws.com/data/locations.json) usando o método `GET`.
- Permite a busca por todas as unidades.
- Oferece busca por unidades utilizando filtros específicos.
- Apresenta uma estimativa do número de resultados encontrados.
- Exibe uma lista das unidades encontradas após a busca.

### Regras de negócio
- Filtra unidades com base no status de abertura ou fechamento.
- Possibilita filtrar as unidades conforme o período de funcionamento.
- Apresenta a mensagem "Nenhuma unidade encontrada" quando não há resultados correspondentes.
- Realiza validação e exibição dos ícones adequados conforme o status da unidade.
