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

interface User {
	name: string
	age: number
}

class UsersData {
	private data: User[] = []

	public showAll(): void {
		Message.showColorized(MessageVariant.Info, 'Users data')
		if (this.data.length === 0) {
			console.log('No data...')
		} else {
			console.table(this.data)
		}
	}

	public add(user: User): void {
		if (user.age > 0 && user.name.length > 0) {
			this.data.push(user)
			Message.showColorized(MessageVariant.Success, 'User has been successfully added!')
		} else Message.showColorized(MessageVariant.Error, 'Wrong data!')
	}

	public remove(name: string): void {
		const index = this.data.findIndex(user => user.name === name)
		if (index !== -1) {
			this.data.splice(index, 1)
			Message.showColorized(MessageVariant.Success, 'User deleted!')
		} else Message.showColorized(MessageVariant.Error, 'User not found...')
	}
}



startApp()
