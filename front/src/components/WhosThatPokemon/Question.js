import React, { useEffect, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useSelector } from 'react-redux';

const Question = ({ addToAnswers, pokemon }) => {

    const user = useSelector(state => state.auth)

    const [answers, setAnswers] = useState([])

    const [answer, setAnswer] = useState(pokemon.name)

    const [err, setErr] = useState('')

    const [userAnswer, setUserAnswer] = useState(null)

    const themeSlice = useSelector(state => state.theme)

    const dynamicText = themeSlice === false ? 'white' : 'black'

    const tempAns = [
        { content: 'George Clooney' },
        { content: 'Mark Zuckerberg' },
        { content: 'Alexander Graham Bell' },
        { content: answer }
    ]

    const answerHandler = (e) => {
        setErr('')
        setUserAnswer(e.target.value)
    };

    const sendAnswer = () => addToAnswers({ user_answer: userAnswer, correct_answer: answer })

    useEffect(() => {
        const shuffled = tempAns.sort((a, b) => 0.5 - Math.random())
        setAnswers(shuffled)
        setAnswer(pokemon.name)
    }, [])

    const keysEvents = (e) => e.key === 'Enter' && sendAnswer()

    return (
        <div tabIndex='0' onKeyDown={keysEvents} className=''>
            <img alt="pokemon" src={pokemon.image} className='whosThatPokemon' style={{ width: '20rem', filter: 'brightness(0)' }} />
            <p style={{ fontWeight: '600', color: 'red' }}>{err}</p>
            <RadioGroup
                style={{ textAlign: 'left', paddingLeft: '15rem' }}
                aria-label="answer"
                defaultValue="banana"
                name="radio-buttons-group">
                {answers.map((answer, idx) => <div key={idx}>
                    <FormControlLabel onClick={answerHandler} value={answer.content} control={<Radio style={{ color: dynamicText }} />} label={`${idx + 1}. ${answer.content} `} />
                    <br />
                </div>)}
            </RadioGroup>
            {userAnswer !== null && <>
                <>{user.user.name === '' ? '' : user.user.name}, please click when you sure. <br /></>
            </>}
        </div>
    )
};

export default Question;
