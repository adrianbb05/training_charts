interface SearchBarProps {
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchBar(searchBarProps: SearchBarProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        searchBarProps.setInputValue(newValue)
    }

    return <>
        <div className={"flex items-center justify-center"}>
            <input type={"text"} onChange={handleChange} placeholder={"Enter exercise title"}></input>
        </div>
    </>
}