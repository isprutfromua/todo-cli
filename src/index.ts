import {select} from "@inquirer/prompts";
import {actionTitles, getActions} from "./models/Actions";
import {initializeTodoList} from "./models/TodoList";


async function handleUserInput(actions: ReturnType<typeof getActions>) {
    let continueExecution = true;

    while (continueExecution) {
        await select({
            message: 'Which action would you do?',
            choices: Object.keys(actions).reduce((acc: { name: string, value: string }[], action) => {
                const item = {
                    name: actionTitles[action as keyof typeof actionTitles],
                    value: action
                }
                acc.push(item)

                return acc
            }, [])
        }).then(async (action) => {
            if (action === 'exit') {
                continueExecution = false;
            } else {
                const result = await actions[action as keyof typeof actions]();

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
    const todoList = initializeTodoList();
    const actions = getActions(todoList);

    await handleUserInput(actions);
}

init()