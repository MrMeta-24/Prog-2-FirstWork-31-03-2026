import { ToDo, Item } from './core.ts';

//usei slice(2) para normalizar argumentos porque tava dando BO :)
const args = process.argv.slice(2);

const file = args[0];
const command = args[1];

if (!file) {
    console.error("Por favor, forneça o caminho do arquivo.");
    process.exit(1);
}

const todo = new ToDo(file);

if (command === "add") {
    const itemDescription = args[2];

    if (!itemDescription) {
        console.error("Por favor, forneça uma descrição para o item.");
        process.exit(1);
    }

    const item = new Item(itemDescription);
    await todo.addItem(item);
    console.log(`Item "${itemDescription}" adicionado com sucesso!`);
    process.exit(0);
}

if (command === "list") {
    const items = await todo.getItems();

    if (items.length === 0) {
        console.log("Nenhum item na lista.");
        process.exit(0);
    }

    console.log("Lista de itens:");
    items.forEach((item, index) => console.log(`${index}: ${item.toJSON().description}`));
    process.exit(0);
}

//implementação do comando update :)
if (command === "update") {
    const indexArg = args[2];
    const newDescription = args[3];

    if (indexArg === undefined || !newDescription) {
        console.error("Uso: update <index> <nova_descrição>");
        process.exit(1);
    }

    const index = Number(indexArg);

    if (isNaN(index)) {
        console.error("O índice deve ser um número válido.");
        process.exit(1);
    }

    try {
        const newItem = new Item(newDescription);
        await todo.updateItem(index, newItem);
        console.log(`Item no índice ${index} atualizado com sucesso!`);
        process.exit(0);
    } catch (error: any) {
        console.error("Erro ao atualizar item:", error.message);
        process.exit(1);
    }
}
//implementação do comando remove :)

if (command === "remove") {
    const indexArg = args[2];

    if (indexArg === undefined) {
        console.error("Uso: remove <index>");
        process.exit(1);
    }

    const index = Number(indexArg);

    if (isNaN(index)) {
        console.error("O índice deve ser um número válido.");
        process.exit(1);
    }

    try {
        await todo.removeItem(index);
        console.log(`Item no índice ${index} removido com sucesso!`);
        process.exit(0);
    } catch (error: any) {
        console.error("Erro ao remover item:", error.message);
        process.exit(1);
    }
}

console.error("Comando desconhecido. Use 'add', 'list', 'update' ou 'remove'.");
process.exit(1);