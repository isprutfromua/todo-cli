import {select} from "@inquirer/prompts";
import {actionTitles, getActions, TAction, TActionKey} from "./models/Actions";
import {initializeSearchableList, initializeSortableList, initializeTodoList} from "./models/TodoList";


async function handleUserInput(actions: TAction) {
    let continueExecution = true;

    while (continueExecution) {
        await select<TActionKey>({
            message: 'Which action would you do?',
            choices: (Object.keys(actions) as TActionKey[]).map((action: TActionKey) => ({
                name: actionTitles[action],
                value: action
            }))
        }).then(async (action) => {
            if (action === 'exit') {
                continueExecution = false;
            } else {
                const result = await actions[action]();

                if (typeof result === 'boolean') {
                    console.log('The action was successfully executed');
                } else {
                    console.log(result);
                }
            }
        });
    }
}

async function init() {
    const listInitializer = await select({
        message: 'Which todo list you want to create?', choices: [
            {name: 'Default', value: initializeTodoList},
            {name: 'Sortable', value: initializeSortableList},
            {name: 'Searchable', value: initializeSearchableList}
        ]
    })
    const todoList = listInitializer();
    const actions = getActions(todoList);

    await handleUserInput(actions);
}

init()