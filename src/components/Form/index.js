import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';


const Form = () => {

    const [number, setNumber] = useState('')
    const [createdDate, setCreatedDate] = useState('')
    const [suppliedDate, setSuppliedDate] = useState('')
    const [comment, setComment] = useState('')

    const [numberDirty, setNumberDirty] = useState(false)
    const [createdDateDirty, setCreatedDateDirty] = useState(false)
    const [suppliedDateDirty, setSuppliedDateDirty] = useState(false)
    const [commentDirty, setCommentDirty] = useState(false)

    const [numberError, setNumberError] = useState('Required field')
    const [createdDateError, setCreatedDateError] = useState('Required field')
    const [suppliedDateError, setSuppliedDateError] = useState('Required field')
    const [commentError, setCommentError] = useState('Required field')

    const [formValid, setFormValid] = useState(false)

    const history = useHistory()

    useEffect(() => {
        if (numberError || commentError || suppliedDateError || createdDateError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [numberError, commentError, suppliedDateError, createdDateError])

    const numberHandler = (e) => {
        setNumber(e.target.value)
        if (e.target.value.length < 3) {
            setNumberError('This field should have at least 3 symbols')
        } else {
            setNumberError('')
        }
    }

    const commentHandler = (e) => {
        setComment(e.target.value)
        if (e.target.value.length > 160) {
            setCommentError('This field should have no more than 160 characters')
        } else if (!e.target.value) {
            setCommentError('Required field')
        } else {
            setCommentError('')
        }
    }

    const suppliedDateHandler = (e) => {
        setSuppliedDate(e.target.value)
        if (!e.target.value) {
            setSuppliedDateError('Required field')
        } else {
            setSuppliedDateError('')
        }
    }

    const createdDateHandler = (e) => {
        setCreatedDate(e.target.value)
        if (!e.target.value) {
            setCreatedDateError('Required field')
        } else {
            setCreatedDateError('')
        }
    }

    const onBlurHandler = (e) => {
        switch (e.target.name) {
            case 'number': setNumberDirty(true)
                break
            case 'createdDate': setCreatedDateDirty(true)
                break
            case 'suppliedDate': setSuppliedDateDirty(true)
                break
            case 'comment': setCommentDirty(true)
                break
        }
    }

    const formatDate = date => {
        return date.split('-').reverse().join('-')
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": Date.now().toString(),
                "number": number,
                "date_created": formatDate(createdDate),
                "date_supplied": formatDate(suppliedDate),
                "comment": comment
            })
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', JSON.stringify(response))
                history.push({ pathname: '/' })
            })
    }

    return (
        <div>
            <div className='headerBlock'>
                <h1 className='headerTitle'>Create invoice</h1>
            </div>
            <div className='formBlock'>
                <form onSubmit={onSubmitHandler}>
                    <div className='formFields'>
                        <div className='rowFields'>
                            <div className='formField'>
                                {(numberDirty && numberError) && <p style={{ color: 'red' }}>{numberError}</p>}
                                <p><label htmlFor='number'>Number:</label></p>
                                <input
                                    type='text'
                                    name='number'
                                    value={number}
                                    onBlur={onBlurHandler}
                                    onChange={numberHandler}
                                />
                            </div>
                            <div className='formField'>
                                {(createdDateDirty && createdDateError) && <p style={{ color: 'red' }}>{createdDateError}</p>}
                                <p><label htmlFor='createdDate'>Invoice date:</label></p>
                                <input
                                    type='date'
                                    name='createdDate'
                                    value={createdDate}
                                    onBlur={onBlurHandler}
                                    onChange={createdDateHandler}
                                />
                            </div>
                        </div>
                        <div className='formField'>
                            {(suppliedDateDirty && suppliedDateError) && <p style={{ color: 'red' }}>{suppliedDateError}</p>}
                            <p><label htmlFor='suppliedDate'>Supply date:</label></p>
                            <input
                                type='date'
                                name='suppliedDate'
                                value={suppliedDate}
                                onBlur={onBlurHandler}
                                onChange={suppliedDateHandler}
                            />
                        </div>
                        <div className='formField'>
                            {(commentDirty && commentError) && <p style={{ color: 'red' }}>{commentError}</p>}
                            <p><label htmlFor='comment'>Comment:</label></p>
                            <textarea
                                name='comment'
                                value={comment}
                                onBlur={onBlurHandler}
                                onChange={commentHandler}
                            />
                        </div>
                    </div>
                    <div className='buttonsBlock'>
                        <button disabled={!formValid}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form;