import './index.css';
import {FileUpload} from "./components/FileUpload";
import {useState} from "react";
import {ExercisesNav} from "./components/ExercisesNav";

function App() {
    const [isUploaded, setIsUploaded] = useState(false)

    const handleSetIsUploaded = () => {
        setIsUploaded(true);
    }

    if (isUploaded) {
        return (
            <ExercisesNav/>
        )
    } else {

        return (
            <>
                <FileUpload setIsUploaded={handleSetIsUploaded}/>
            </>
        );
    }
}

export default App;
