import React, {ChangeEvent, FormEvent, useState} from 'react';
import {mapCsvToJson} from "../utils/datareader/csv-mapper";
import {mapDataToWorkout} from "../utils/mapper/workoutMapper";
import {WorkoutData} from "../utils/entities/WorkoutData";

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
            let workoutData: WorkoutData[] = await mapCsvToJson(file)
            mapDataToWorkout(workoutData)
        }
        setIsUploaded()
    };

    return (
        <>
            <div className="grid place-items-center h-screen">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold">Upload Your File</h1>
                    <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">Choose
                                File:</label>
                            <input id="file-upload" type="file"
                                   className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                   onChange={handleFileChange}
                            />

                        </div>
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
        ;
}
