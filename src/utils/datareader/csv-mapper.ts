import {parse} from "csv-parse/browser/esm/sync";

export async function mapCsvToJson(file: File) {
    const fileString = await fileToString(file);

    return parse(fileString, {
        columns: true,
        skip_empty_lines: true,
    });
}

function fileToString(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target?.result as string;
            resolve(text);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsText(file);
    });
}