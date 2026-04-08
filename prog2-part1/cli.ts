import todo from './core.ts';
const command = process.argv[2];

/*Implemente a lógica para o comando "add"*/

if (command === "add") {
  const item = process.argv[3];
  let priority = process.argv[4] as any;
  let date = process.argv[5];
  if (!item) {
    console.error("Por favor, forneça um item para adicionar.");
    process.exit(1);
  }
  if (!priority) {
    priority = "Baixa";
  }
  await todo.addItem(item);
  console.log(`Item "${item}" adicionado com sucesso!`);
  process.exit(0);
}

const validPriorities = ["Baixa", "Medio", "FAZ LOGO SEU PUTO"];
  if (!validPriorities.includes(priority)) {
    console.error("Prioridade inválida. Use: Baixa, Medio ou FAZ LOGO SEU PUTO.");
    process.exit(1);
  }

  await todo.addItem(item, priority, date);
  console.log(`Item "${item}" adicionado com sucesso!`);
  process.exit(0);
}

/*Implemente a lógica para o comando "list"*/

if (command === "list") {
  const items = await todo.getItems();

  if (items.length === 0) {
    console.log("Nenhum item na lista.");
    process.exit(0);
  }

  console.log("Lista de tarefas:");

  items.forEach((item, index) => {
    const status = item.done ? "Concluído" : "Pendente";

    // PRIORIDADE VISUAL
    let prioridadeTexto = item.priority;

    // DATA
    let dateText = "";
    if (item.date) {
      const now = new Date();
      const due = new Date(item.date);
      const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diff < 0) {
        dateText = " (ATRASADA)";
      } else if (diff === 0) {
        dateText = " (vence hoje)";
      } else {
        dateText = ` (vence em ${diff} dias)`;
      }
    }

    console.log(`${index}: [${status}] [${prioridadeTexto}] ${item.text}${dateText}`);
  });

  process.exit(0);
}

/*Implemente a lógica para o comando "update"*/

if (command === "update") {
  const index = parseInt(process.argv[3] as string );
  const newItem = process.argv[4];
  if (isNaN(index) || !newItem) {
    console.error("Por favor, forneça um índice válido e um novo item.");
    process.exit(1);
  }

  try {
    await todo.updateItem(index, newItem);
    console.log(`Item no índice ${index} atualizado para "${newItem}".`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

/*Implemente a lógica para o comando "remove"*/

if (command === "remove") {
  const index = parseInt(process.argv[3] as string);
  if (isNaN(index)) {
    console.error("Por favor, forneça um índice válido para remover.");
    process.exit(1);
  }
  
  try {
    await todo.removeItem(index);
    console.log(`Item no índice ${index} removido com sucesso.`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

/*Implemente a lógica para comando desconhecido*/

console.error("Comando desconhecido. Use 'add', 'list', 'update' ou 'remove'.");
process.exit(1);