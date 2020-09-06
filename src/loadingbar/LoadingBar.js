import React, {useEffect, useState} from 'react'

export default function LoadingBar(props) {
    // get URI for resource to load/download
    const URI = props.URI  // this will need to throw error if not present
    if(!URI){ // catch missing prop error
        throw new Error('URI for file to download is required. (URI prop in LoadingBar component.)')
    }

    // load styles from props or use defaults
    const styleProps =  {...props?.style} // use optional chain to determine if prop is provided
    const style = {
        borderColor: styleProps.borderColor || styleProps.borderColor || 'black',

    }

    // set options from props or use defaults
    const optionsProps = {...props?.options}
    const options = {
        displayPercent: optionsProps.displayPercent || true,
        hint: optionsProps.hint || 'Downloading',
        showHint: optionsProps.showHint || false
    }

    // setup state for readable stream progress
    const [progress, setProgress] = useState(0)

    // start fetch and create readable stream
    return (
        <div>
            
        </div>
    )
}
