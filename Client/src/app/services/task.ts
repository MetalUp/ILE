import { ICodeRulesBlock, IMessages } from "./rules";

export interface ITask {
    Language: string;
    Title: string;
    Description: string;
    Hints: string[];
    Messages?: IMessages,
    CodeMustMatch?: ICodeRulesBlock,
    CodeMustNotContain?: ICodeRulesBlock,
    WrappingCode?: string,
    SkeletonCode?: string;
    PasteExpression?: boolean,
    PasteFunction?: boolean,
    Tests?: string 
}

export const EmptyTask = {
    Language: '',
    Title: '',
    Description: '',
    Hints: []
}