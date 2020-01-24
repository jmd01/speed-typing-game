import React, {useState, useEffect, useRef} from 'react'

const App = () => {
    const STARTING_TIME = 3
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isPlaying, setIsPlaying] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    
    const textarea = useRef()
    
    const handleChange = e => {
        setText(e.target.value)    
    }
    
    const startGame = () => {
        setIsPlaying(true)
        setWordCount(0)
        textarea.current.disabled = false
        textarea.current.focus()
    }
    
    const endGame = () => {
        setWordCount(calculateWordCount(text))
        setIsPlaying(false)
        setTimeRemaining(STARTING_TIME)
    }
    
    const calculateWordCount = (text) => {
        const words = text.trim().split(" ")
        console.log(words)
        return words.length
    }
    
    useEffect(() => {
        if (isPlaying && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(currentTime => currentTime - 1)
            }, 1000)   
        } else {
            endGame()
        }
    }, [isPlaying, timeRemaining])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea 
                ref={textarea} 
                disabled={!isPlaying} 
                name="text" 
                value={text} 
                onChange={handleChange} 
            />
            <h1>Time remaining: {timeRemaining}</h1>
            <button disabled={isPlaying} onClick={startGame}>Start</button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}

export default App