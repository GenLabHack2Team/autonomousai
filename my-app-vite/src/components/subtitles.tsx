import { useOpenAI } from '@/hooks/useOpenAI'
import { useEffect, useState, memo } from 'react'
import { Separator } from '@/components/ui/separator'

type Word = {
    type: 'word' | 'phrase'
    value: string
}

type SubtitlesProps = {
    className?: string
    text: string
}

const Subtitles = memo(({ className, text }: SubtitlesProps) => {
    const [words, setWords] = useState<Word[]>([])
    const { extract } = useOpenAI()

    useEffect(() => {
        if (!text) return;
        const getWordsFromText = async (text: string) => {
            const words = await extract(text)
            if (words == null) return;
            const wordsObject = JSON.parse(words)
            setWords(Object.entries(wordsObject).map(([key, value]) => {
                return { type: value, value: key } as Word
            }))
        }
        getWordsFromText(text)
    }, [text, setWords])

    console.log(words)

    return <div className={className}>
        {text}
        <Separator className='my-4' />
        {words.map(({ type, value }) => {
            return <div key={value}>
                {type}: {value}
            </div>
        })}
        <div className='p-8 mt-8 rounded bg-slate-100 text-xl font-bold text-center text-primary'>Back to camera.</div>
    </div>
})

export { Subtitles }