import * as React from "react"
import { Check, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAppContext } from "@/context/appContext"

const teachers: Array<{
    value: string,
    label: string,
}> = [
        {
            value: "casual-neutral",
            label: "Casual",
        },
        {
            value: "casual-male",
            label: "Casual Male",
        },
        {
            value: "casual-female",
            label: "Casual Female",
        },
        {
            value: "formal",
            label: "Formal",
        },
    ]

type TeacherSelectorProps = {
    className?: string
}

const TeacherSelector = ({ className }: TeacherSelectorProps) => {
    const [open, setOpen] = React.useState(false)
    const { selectedTeacher, setTeacher } = useAppContext()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={className}
                >
                    {selectedTeacher
                        ? teachers.find((teacher) => teacher.value === selectedTeacher)?.label
                        : "Select teacher..."}
                    <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" sideOffset={5}>
                <Command>
                    <CommandGroup>
                        {teachers.map((teacher) => (
                            <CommandItem
                                key={teacher.value}
                                value={teacher.value}
                                onSelect={(currentValue) => {
                                    setTeacher(currentValue as Teacher)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedTeacher === teacher.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {teacher.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { TeacherSelector }