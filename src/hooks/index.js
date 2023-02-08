// Custom hooks
import { v4 as uuidv4, v4 } from "uuid";

import { useState } from "react"

// prevent form submitted to the server multiple times by double click the button
export const useSubmitForm = (cb) => {
    const [success, setSuccess] = useState(false)
    return event => {
        if (!success) {
            setSuccess(true)
            cb(event, setSuccess)
        }
        else {
            event.preventDefault()
        }
    }
}


export const useRefreshPage = () => {
    const [seed, setSeed] = useState(0)
    setSeed(uuidv4())
}