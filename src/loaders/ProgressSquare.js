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
    colorSecondary: props?.colorSecondary || "black",
    colorText: props?.colorText || "white",
    delay: props?.delay || "1.2",
    size: getWidth(props?.size) || 300,
    containerStyle: props?.containerStyle || {},
    textStyle: props?.textStyle || {},
    percent: props?.percent,
    dumb: props?.dumb || false,
    completeMessage: props?.completeMessage || "Done!",
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

  const themes = {}

  // smart percentage component
  const percentComponentSmartPrimary = (
      <div className="percentage-component-sm" style={{
          position:'absolute',
          display:'flex',
          top:0,
          right:0,
          bottom:0,
          left:0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
      <div className="percentage-text" style={{
          position: 'relative',
          color: `${options.colorPrimary}`,
          fontSize: `${options.size/10}px`

      }}>
      {isNaN(((received / size) * 100).toFixed(0))
          ? 0
          : ((received / size) * 100).toFixed(0)}%
      </div>
        
      </div>
  )

  // SMART COMPONENT
  return (
    <div
      className="outer-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
        width: `${options.size}px`,
        height: `${options.size}px`,
      }}
    >
      <div
        className="inner-container"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: `${options.size}px`,
          position: 'relative',
          height: `${options.size}px`,
          background: `${options.colorSecondary}`,
        }}
      >
        {
            options.displayPercent &&
            percentComponentSmartPrimary
        }
        <div
          className="inner-fill"
          style={{
            width: options.size,
            background: `${options.colorPrimary}`,
            position: 'absolute',
            bottom:0,
            left: 0,
            right:0,
            height: `${((received / size) * 100).toFixed(0)}%`,
            transition: `all ${options.smoothing} cubic-bezier(0.68, -0.6, 0.32, 1.6)`
          }}
        ></div>
      </div>
    </div>
  )
}
ProgressSquare.propsTypes = {
  /** {number} size in pixels of square */
  size: PropTypes.number,
  /** {string} of path to asset location. */
  URL: PropTypes.string,
  /** {object} containing user defined styles in react inline-styles format. */
  containerStyle: PropTypes.object,
  /** {object} styles for hint and completion text */
  textStyle: PropTypes.object,
  /** {string} for use in list via array.map function */
  key: PropTypes.string,
  /** {function}: callback to fire (in parent component) on completion of download */
  onComplete: PropTypes.func,
  /** {string} message to display after download is complete */
  completeMessage: PropTypes.string,
  /** {boolean} display percentage complete in addition to progress bar */
  displayPercent: PropTypes.bool,
  /** {string} message to display while in progress */
  hint: PropTypes.string,
  /** {boolean} to show/hide hint message */
  showHint: PropTypes.bool,
  /** {string: low, medium, high} determines how smooth the animation of the progress bar is*/
  smoothing: PropTypes.string,
  /** {string: hex, rgb, rgba} primary color */
  colorPrimary: PropTypes.string,
  /** {string: hex, rgb, rgba} secondary color */
  colorSecondary: PropTypes.string,
  /** {string} text color */
  colorText: PropTypes.string,
  /** {string} preset style themes */
  theme: PropTypes.string,
  /** {number} manually control progress of bar without providing an asset path/URL */
  percent: PropTypes.number,
  /** {boolean} if dumb, percent is controlled manually by percent parameter and not by component itself */
  dumb: PropTypes.bool,
  /** {boolean} manually trigger completion animation */
  triggerComplete: PropTypes.bool,
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
        return ".2s"
    }
  }
  return ".4s"
}

// get width (apply min and max standards)
function getWidth(desiredWidth) {
  if (desiredWidth < 50) {
    return 80
  }
  if (desiredWidth > 600) {
    return 600
  } else return desiredWidth
}
function getTimeout(smoothingString) {
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