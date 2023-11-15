import { useAppContext } from "./context/appContext"
import CameraPage from "./pages/CameraPage";
import KeyPage from "./pages/KeyPage"
import TranslatePage from "./pages/TranslatePage";

function App() {
    const { page } = useAppContext();
    return (
        <>
            {page === 0 ?
                <KeyPage />
                : page === 1 ?
                    <CameraPage />
                    : page === 2 ?
                        <TranslatePage />
                        : <></>
            }
        </>
    )
}

export default App
