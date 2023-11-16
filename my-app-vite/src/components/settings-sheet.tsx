import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Settings } from "lucide-react"
import { LanguageSelector } from "./selectors/language-selector"
import { TeacherSelector } from "./selectors/teacher-selector"
import { ModeSelector } from "@/components/selectors/mode-selector"

const SettingsSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="absolute top-4 right-4 z-10" variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                        You can change App settings here as well as top page.
                    </SheetDescription>
                </SheetHeader>
                <div className="text-sm font-medium leading-none mb-3 mt-4">Language</div>
                <LanguageSelector className="w-full" />
                <div className="text-sm font-medium leading-none mb-3 mt-4">Mode</div>
                <ModeSelector className="w-full" />
                <div className="text-sm font-medium leading-none mb-3 mt-4">Teacher</div>
                <TeacherSelector className="w-full" />
            </SheetContent>
        </Sheet>
    )
}

export { SettingsSheet }