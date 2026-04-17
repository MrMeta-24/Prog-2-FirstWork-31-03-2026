Como instalar e usar Thunder Client:

Instale a extensão Thunder Client no VS Code (procure por "Thunder Client" no marketplace)
Após instalar, abra a extensão e crie uma nova requisição
Testes recomendados:

1. Listar todos os itens (GET /items)

Método: GET
URL: http://localhost:3000/items
Resultado esperado: Uma lista de itens em JSON (ou lista vazia se nenhum item foi adicionado)
2. Adicionar um novo item (POST /items)

Método: POST
URL: http://localhost:3000/items
Headers: Content-Type: application/json
Body (JSON):
{
  "description": "Primeira tarefa"
}
Resultado esperado: Status 201 com mensagem de sucesso e o item criado
3. Adicionar outro item (POST /items)

Método: POST
URL: http://localhost:3000/items
Headers: Content-Type: application/json
Body (JSON):
{
  "description": "Segunda tarefa"
}
4. Listar novamente para verificar (GET /items)

Deve retornar os dois itens adicionados
5. Atualizar um item (PUT /items/0)

Método: PUT
URL: http://localhost:3000/items?index=1
Headers: Content-Type: application/json
Body (JSON):
{
  "description": "Primeira tarefa - ATUALIZADA"
}
Resultado esperado: Status 200 com mensagem de sucesso
6. Remover um item (DELETE /items/1)

Método: DELETE
URL: http://localhost:3000/items?index=3
Resultado esperado: Status 200 com mensagem de sucesso
7. Listar novamente para confirmar a remoção (GET /items)

Deve retornar apenas um item (o primeiro, modificado)
Testando erros:

8. Tentar adicionar sem descrição (POST /items)

Body (JSON):
{
  "description": ""
}
Ou: Body vazio {}
Resultado esperado: Status 400 com mensagem de erro
9. Tentar acessar rota inexistente (GET /invalid)

Resultado esperado: Status 404 com mensagem de erro
Como executar a aplicação na Parte 3
Certifique-se de que todos os arquivos estão na pasta do projeto:

core.ts (reutilizado da Parte 2)
server.ts (novo)
Para iniciar o servidor, execute o seguinte comando no terminal:

bun server.ts
ou se preferir adicione --watch para reiniciar o servidor automaticamente sempre que um arquivo do projeto for modificado:

bun --watch server.ts
