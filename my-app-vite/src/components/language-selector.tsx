import * as React from "react"
import { Check, Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAppContext } from "@/context/appContext"

const languages: Array<{
    value: Language,
    label: string
}> = [
        {
            value: "english",
            label: "English",
        },
        {
            value: "spanish",
            label: "Español",
        },
        {
            value: "japanese",
            label: "日本語",
        },
    ]

const LanguageSelector = () => {
    const [open, setOpen] = React.useState(false)
    const { selectedLanguage, setSelectedLanguage } = useAppContext()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedLanguage
                        ? languages.find((language) => language.value === selectedLanguage)?.label
                        : "Select language..."}
                    <Languages className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {languages.map((language) => (
                            <CommandItem
                                key={language.value}
                                value={language.value}
                                onSelect={(currentValue) => {
                                    setSelectedLanguage(currentValue === selectedLanguage ? "" : currentValue as Language)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedLanguage === language.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {language.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { LanguageSelector }