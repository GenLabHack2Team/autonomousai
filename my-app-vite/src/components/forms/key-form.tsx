import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAppContext } from "@/context/appContext"

const FormSchema = z.object({
    apiKey: z.string().min(2, {
        message: "Api Key must be at least 2 characters.",
    }),
})

type KeyFormProps = {
    className?: string
}

const KeyForm = ({ className }: KeyFormProps) => {
    const { setApiKey, setPage } = useAppContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setApiKey(data.apiKey)
        setPage(1)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>OpenAI Api Key</FormLabel>
                            <FormControl>
                                <Input placeholder="sk-abcdef12345" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is a BYOK (Bring your own keys) application.
                                We do not collect any information.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Continue</Button>
            </form>
        </Form>
    )
}

export { KeyForm }