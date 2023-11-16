import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppContext } from "@/context/appContext"

export function ModeSelector() {
    const { selectedMode, setSelectedMode } = useAppContext()

    return (
        <RadioGroup defaultValue={selectedMode}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem onClick={() => setSelectedMode("long")} value="long" id="r1" />
                <Label htmlFor="r1">Long Description</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem onClick={() => setSelectedMode("short")} value="short" id="r2" />
                <Label htmlFor="r2">Short Description</Label>
            </div>
        </RadioGroup>
    )
}
