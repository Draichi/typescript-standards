class ProjectInput {
    templateElmnt: HTMLTemplateElement;
    hostElmnt: HTMLDivElement;
    element: HTMLFormElement;
    constructor() {
        this.templateElmnt = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElmnt = document.getElementById('app') as HTMLDivElement;
        const importedNode = document.importNode(this.templateElmnt.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.attach()
    }
    private attach() {
        this.hostElmnt.insertAdjacentElement('afterbegin', this.element)
    }
}

const projectInput = new ProjectInput();