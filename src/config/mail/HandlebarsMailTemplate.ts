import handlebars from "handlebars";

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IparseMailTemplate {
    template: string;
    variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
    public async parse({ template, variables }: IparseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template);
        const finalTemplateWithVariables = parseTemplate(variables);
        return finalTemplateWithVariables;
    }
}