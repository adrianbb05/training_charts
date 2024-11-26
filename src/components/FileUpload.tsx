import React, {ChangeEvent, FormEvent, useState} from 'react';
import {mapCsvToJson} from "../utils/datareader/csv-mapper";
import {mapDataToWorkout} from "../utils/mapper/workoutMapper";

interface FileUploadProps {
    setIsUploaded: () => void;
}

export function FileUpload({setIsUploaded}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            let json = await mapCsvToJson(file)
            mapDataToWorkout(json)
        }
        setIsUploaded()
    };

    return (
        <>
            <h2>File Import</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange}/>
                    <button type="submit">Upload</button>
                </form>
            </div>
        </>
    );
}
