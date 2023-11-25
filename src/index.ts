const consola = require('consola')
const inquirer = require('inquirer')

enum Action {
	List = 'list',
	Add = 'add',
	Remove = 'remove',
	Quit = 'quit',
}

enum MessageVariant {
	Success = 'success',
	Error = 'error',
	Info = 'info',
}

type InquirerAnswers = {
	action: Action
}

const startApp = () => {
	inquirer
		.prompt([
			{
				name: 'action',
				type: 'input',
				message: 'How can I help you?',
			},
		])
		.then(async (answers: { action: 'list' | 'add' | 'remove' | 'quit' }) => {
			console.log('Chosen action: ' + answers.action)
			startApp()
			if (answers.action === 'quit') return
		})
}

class Message {
	constructor(private content: string) {}

	public show(): void {
		console.log(this.content)
	}

	public capitalize(): string {
		let capitalizedContent = this.content.charAt(0).toUpperCase() + this.content.slice(1)
		return capitalizedContent
	}

	public toUpperCase(): string {
		return this.content.toUpperCase()
	}

	public toLowerCase(): string {
		return this.content.toLocaleLowerCase()
	}

	public static showColorized(variant: MessageVariant, text: string): void {
		if (variant === MessageVariant.Success) {
			consola.success(text)
		} else if (variant === MessageVariant.Error) {
			consola.error(text)
		} else if (variant === MessageVariant.Info) {
			consola.info(text)
		} else {
			consola.info(text)
		}
	}
}


startApp()
