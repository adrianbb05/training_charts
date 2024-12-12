import {BrowserRouter as Router, Routes} from "react-router"
import {useState} from "react";
import {SearchBar} from "../utils/SearchBar";
import {convertNamesToElements, handleExerciseNames} from "../utils/ExerciseUtils";


export function ExercisesNav() {
    const [inputValue, setInputValue] = useState("")
    let exerciseNames: string[] = handleExerciseNames(inputValue);
    let exerciseComponents = convertNamesToElements(exerciseNames)

    return (
        <div>
            <Router>
                <div className="flex min-h-screen">
                    <div className="w-1/4 p-4">
                        <SearchBar setInputValue={setInputValue}/>
                        <nav className="grid grid-cols-1 gap-2">
                            {exerciseComponents.map(ec => ec.link)}
                        </nav>
                    </div>
                    <div className="flex-grow p-4">
                        <Routes>
                            {exerciseComponents.map(ec => ec.route)}
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )
}