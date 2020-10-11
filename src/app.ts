const autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};

class ProjectInput {
    templateElmnt: HTMLTemplateElement;
    hostElmnt: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElmnt: HTMLInputElement;
    descriptionInputElmnt: HTMLInputElement;
    peopleInputElmnt: HTMLInputElement;
    constructor() {
        this.templateElmnt = document.getElementById(
            "project-input"
        ) as HTMLTemplateElement;
        this.hostElmnt = document.getElementById("app") as HTMLDivElement;
        const importedNode = document.importNode(this.templateElmnt.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
        this.titleInputElmnt = this.element.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descriptionInputElmnt = this.element.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInputElmnt = this.element.querySelector(
            "#people"
        ) as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private attach() {
        this.hostElmnt.insertAdjacentElement("afterbegin", this.element);
    }
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElmnt.value;
        const enteredDescription = this.descriptionInputElmnt.value;
        const enteredPeople = this.peopleInputElmnt.value;
        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('invalid input')
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput
            console.log(title, description, people)
            this.clearInputs()
        }
    }
    private clearInputs() {
        this.titleInputElmnt.value = ''
        this.descriptionInputElmnt.value = ''
        this.peopleInputElmnt.value = ''
    }
    private configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}

const projectInput = new ProjectInput();
