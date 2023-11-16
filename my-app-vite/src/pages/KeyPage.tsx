import { LanguageSelector } from "@/components/selectors/language-selector"
import { ModeSelector } from "@/components/mode-selector"
import { KeyForm } from "@/components/forms/key-form"


function KeyPage() {

    return (
        <div className="w-full min-h-screen flex flex-col justify-center md:items-center p-8">
            <div className="text-2xl md:text-[40px] md:w-1/4 font-bold pb-8 text-start">TRANSLATEO</div>
            <div className="mb-8 md:w-1/4"><LanguageSelector /></div>
            <div className="mb-8 md:w-1/4"><ModeSelector /></div>
            <KeyForm className="md:w-1/4 space-y-6" />
        </div>
    )
}

export default KeyPage