import {  FunctionPlaceholder, TaskCodePlaceholder } from "./language-helpers";

export function wrapCSharpExpression(expression : string) {
    return `
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    class MainWrapper {
        ${TaskCodePlaceholder}

        private static string Display(object obj)
        {
            if (obj == null)  return null;
            if (obj is string) return $"{obj}";
            if (obj is Boolean) return (Boolean) obj ? "true" : "false";
            if (obj is IEnumerable)
            {
                var display = ((IEnumerable)obj).Cast<object>().Select(o => Display(o));
                return $@"{{{string.Join(',', display)}}}";
            }
            return obj.ToString();
        }

        static void Main(string[] args) {
           System.Console.WriteLine(Display(${(expression)}));
        }

       ${FunctionPlaceholder}
    }`;
}

export function wrapCSharpFunctions(functions : string) {
    return `
    using System;
    using System.Linq;
    using System.Collections;
    using System.Collections.Generic;

    
    class MainWrapper{
        ${TaskCodePlaceholder}

        static void Main(string[] args) {}
    }

    static class UserDefinedFunctions {
        ${functions}
    }
    `;
}