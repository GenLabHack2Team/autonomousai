import { createContext, useContext, useState } from "react";

interface Value {
    apiKey: string
    setApiKey: React.Dispatch<React.SetStateAction<string>>
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    selectedLanguage: Language,
    setLanguage: React.Dispatch<React.SetStateAction<Language>>
    selectedTeacher: Teacher,
    setTeacher: React.Dispatch<React.SetStateAction<Teacher>>
}

const AppContext = createContext<Value | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState<number>(0);
    const [apiKey, setApiKey] = useState<string>("");
    const [selectedLanguage, setLanguage] = useState<Language>('english')
    const [selectedTeacher, setTeacher] = useState<Teacher>('casual-neutral')

    const value = {
        apiKey,
        setApiKey,
        page,
        setPage,
        selectedLanguage,
        setLanguage,
        selectedTeacher,
        setTeacher
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }
    return context
}