import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
/**
 * Usage:
 * ```js
 * <LoadingSquare URL={videoAsset}
 *      size={200}
 *      theme={outline}
 * }} />
 * ```
 */
export default function ProgressSquare(props) {
    const options = {
      displayPercent:
        props?.displayPercent !== undefined ? props?.displayPercent : true,
      hint: props?.hint || "Downloading",
      showHint: props?.showHint || false,
      doneMessage: props?.doneMessage || "Done!",
      smoothing: parseSmoothing(props?.smoothing),
      theme: props?.theme || "basic",
      colorPrimary: props?.colorPrimary || "white",
      colorSecondary: props?.colorSecondary || "white",
      colorText: props?.colorText || "white",
      delay: props?.delay || "1.2",
      size: props?.size || "300px",
      containerStyle: props?.containerStyle || {},
      textStyle: props?.textStyle || {},
      percent: props?.percent,
      dumb: props?.dumb || false,
      completeMessage: props?.completeMessage || "Done!",
    }

    // progress control
    // SMART STATE
    // setup state for readable stream progress
    const [size, setSize] = useState(0)
    const [received, setReceived] = useState(0)
    const [complete, setComplete] = useState(false)
    // start fetch and create readable stream
    useEffect(() => {
      // only start fetch if component is smart
      if (!options.dumb) {
        get()
      }
    }, []) // call upon component mount

    // second order functions passed in via props
    const onComplete = props.onComplete || null

    function get() {
      fetch(URL, {})
        .then((res) => {
          let size = res.headers.get("Content-Length")
          console.log("Total Size: " + size)
          setSize(size)
          return res.body
        })
        .then((body) => {
          let reader = body.getReader()
          return new ReadableStream({
            start(controller) {
              return pump()
              function pump() {
                return reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close()
                    setComplete(true)
                    return
                  }
                  controller.enqueue(value)
                  let size = value.length
                  setReceived((old) => old + size)
                  console.log(size)
                  return pump()
                })
              }
            },
          })
        })
    }

  // onComplete callback if provided by dev
  useEffect(() => {
    // if stream is complete and onComplete callback is provided, run callback
    if (complete && onComplete && typeof onComplete === "function") {
      // use delay parameter to time complete handler with animations
      setTimeout(() => {
        onComplete()
        // call oncomplete after animation delay and duration complete
      }, parseInt(options.delay) * 1000 + 1000)
    }
    return
  }, [complete])

  // chunk read callback
  useEffect(() => {
    console.log(received)
  }, [received])

  // DUMB STATE
  const [percent, setPercent] = useState(0.01)
  // dumb component percentage update
  useEffect(() => {
    if (options.dumb) {
      setPercent(props.percent)
    }
  }, [props.percent])
  // dumb component completion update
  useEffect(() => {
    if (props.triggerComplete === true && props.dumb) {
      setComplete(true)
    }
  }, [props.triggerComplete])


  const themes = {

  }

  // SMART COMPONENT
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: options.size,
            height: options.size
        }}>

            
        </div>
    )
}
ProgressSquare.propsTypes = {
    /** {number} size in pixels of square */
    size: PropTypes.number
}