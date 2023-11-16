"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { useAppContext } from "@/context/appContext"
import { LanguageSelector } from "@/components/language-selector"
import { ModeSelector } from "@/components/mode-selector"

const FormSchema = z.object({
    apiKey: z.string().min(2, {
        message: "Api Key must be at least 2 characters.",
    }),
})

type FormValues = {
    apiKey: string;
};

const defaultValues: FormValues = {
    apiKey: localStorage.getItem("apiKey") ?? ""
}

function KeyPage() {
    const { setApiKey, setPage } = useAppContext();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        localStorage.setItem("apiKey", data.apiKey);
        setApiKey(data.apiKey)
        setPage(1)
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center md:items-center p-8">
            <div className="text-2xl md:text-[40px] md:w-1/4 font-bold pb-8 text-start">TRANSLATEO</div>
            <div className="mb-8 md:w-1/4"><LanguageSelector /></div>
            <div className="mb-8 md:w-1/4"><ModeSelector /></div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/4 space-y-6">
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
                                    We do not collect any information. Key is stored in local
                                    storage.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Continue</Button>
                </form>
            </Form>
        </div>
    )
}

export default KeyPage