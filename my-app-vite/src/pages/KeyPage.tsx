import { LanguageSelector } from "@/components/selectors/language-selector"
import { KeyForm } from "@/components/forms/key-form"

function KeyPage() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center p-8">
            <div className="text-2xl font-bold pb-8">TRANSLATEO</div>
            <div className="mb-8"><LanguageSelector className="w-[200px] justify-between" /></div>
            <KeyForm className="md:w-2/3 space-y-6" />
        </div>
    )
}

export default KeyPage