import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"


export default function LiquidLoader(props) {
  const options = {
    displayPercent:
      props?.displayPercent !== undefined ? props?.displayPercent : true,
    hint: props?.hint || "Downloading",
    showHint: props?.showHint || false,
    doneMessage: props?.doneMessage || "Done!",
    smoothing: parseSmoothing(props?.smoothing),
    theme: props?.theme || "basic",
    colorPrimary: props?.colorPrimary || "white",
    colorSecondary: props?.colorSecondary || "black",
    colorText: props?.colorText || "white",
    delay: props?.delay || "1.2",
    containerStyle: props?.containerStyle || {},
    textStyle: props?.textStyle || {},
    percent: props?.percent,
    dumb: props?.dumb || false,
    size: getSize(props?.size) || 300,
    completeMessage: props?.completeMessage || "Done!",
    timeout: getTimeout(props?.smoothing) || 400,
  }
  // get URI for resource to load/download
  const URL = props.URL // this will need to throw error if not present
  if (!URL && !options.dumb) {
    console.log(URL)
    // catch missing prop error
    throw new Error(
      "URL for file to download is required. (URL prop in LoadingBar component.)"
    )
  }

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
                let size = 0
                size += value.length
                setTimeout(() => {
                  setReceived((old) => old + size)
                  console.log("Updating state from chunks.")
                  return pump()
                }, options.timeout)
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

  // Smart Component
  return (
        <div className="outer-liquid-layer" style={{
            width: `${options.size}px`,
            height: `${options.size}px`,
            position: 'relative',
            overflow: 'hidden',
            background: options.colorSecondary,

        }}>
            <div className="inner-liquid-layer" style={{
                background: options.colorPrimary,
                position: 'absolute',
                top:0,
                left:0,
                right:0,
                bottom:0
            }}>
                <div className="liquid-mask-layer spin" style={{
                    borderRadius: '45%',
                    background: 'black',
                    position: 'absolute',
                    bottom: `${((received / size) * 100).toFixed(0)}%`,
                    transition: `bottom ${options.smoothing} ease-in-out`,
                    left: `${-options.size/2}px`,
                    width:'200%',
                    height:'200%',
                }}>
                </div>
                
            </div>
        </div>
    )
}


// get smoothing rate
function parseSmoothing(string) {
    if (string) {
      switch (string) {
        case "low":
          return ".05s"
          break
        case "medium":
          return ".4s"
          break
        case "high":
          return ".8s"
          break
        default:
          return ".4s"
      }
    }
    return ".4s"
  }
  
  // get width (apply min and max standards)
  function getSize(desiredSize) {
    if (desiredSize < 50) {
      return 80
    }
    if (desiredSize > 600) {
      return 600
    } else return desiredSize
  }
  function getTimeout(smoothingString){
    if (smoothingString) {
      switch (smoothingString) {
        case "low":
          return 50
          break
        case "medium":
          return 400
          break
        case "high":
          return 800
          break
        default:
          return 400
      }
    }
  }