import React, { useEffect, useState } from "react"
import earth from "../earthspin.mp4"
import PropTypes from "prop-types"
/**
 * Usage:
 * ```js
 * <LoadingBar URL={videoAsset}
 *      options={{
 *          hint: 'Video is loading',
 *          showHint: true
 * }} />
 * ```
 */
export default function ProgressSpinner(props) {
  // set options from props or use defaults
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
    height: props?.height || "30px",
    containerStyle: props?.containerStyle || {},
    textStyle: props?.textStyle || {},
    percent: props?.percent,
    dumb: props?.dumb || false,
    radius: props?.radius || '300px',
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

  // SMART STATE
  // setup state for readable stream progress
  const [progress, setProgress] = useState(0)
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

  // optional element components
  const percentageElementSmart = ( //percentage tracker
    <div
      style={{
        fontSize: "12px",
        opacity: !complete ? 1 : 0,
        transition: `opacity .4s ease-in`,
        transitionDelay: `${options.delay}s`,
        ...options.textStyle,
      }}
    >
      <div style={{ fontWeight: "light" }}>
        {isNaN(((size / received) * 100).toFixed(0))
          ? 0
          : ((size / received) * 100).toFixed(0)}
        <span style={{ fontWeight: "bold", position: "relative" }}>%</span>
      </div>
    </div>
  )
  const percentageElementDumb = ( //percentage tracker
    <div
      style={{
        fontSize: "12px",
        opacity: !complete ? 1 : 0,
        transition: `opacity .4s ease-in`,
        transitionDelay: `${options.delay}s`,
        ...options.textStyle,
      }}
    >
      <div style={{ fontWeight: "light" }}>
        {props.percent || 0}
        <span style={{ fontWeight: "bold", position: "relative" }}>%</span>
      </div>
    </div>
  )

  const hintElement = ( // hint element
    <div
      style={{
        fontSize: "12px",
        opacity: !complete ? 1 : 0,
        transition: `opacity .4s ease-in`,
        transitionDelay: `${options.delay}s`,
        ...options.textStyle,
      }}
    >
      {!complete ? options.hint : options.completeMessage}
    </div>
  )

  // styles
  const themes = {
    basic: {
      background: "rgba(255,255,255,.1)",
      foreground: `0px solid ${options.colorPrimary}`
    },

    outline: {
      background: "transparent",
      foreground: `2px solid ${options.colorPrimary}`
    },
    minimal: {
      background: "transparent",
      foreground: `1px solid ${options.colorPrimary}`
    },
  }

  //  SMART COMPONENT MARKUP
  if (!options.dumb) {
    return (
      // container element
      <div
        className="progress-spinner-smart"
        style={{
          ...options.containerStyle,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems:'center',
          padding: "10px 0 10px 0",
          letterSpacing: "2px",
        }}
      >
        <div
          style={{
            color: `${options.colorText}`,
            width: `${!complete ? `${options.radius}px` : "300px"}`,
            height: `${!complete ? `${options.radius}px` : "300px"}`,
            position: 'relative',
            zIndex:80,
            // transition: "width .4s cubic-bezier(0.36, 0, 0.66, -0.56)",
            transitionDelay: `${options.delay}s`,
            padding:'10px'
          }}
        >
          {/* outer part of loading bar */}
          <div
            className="react-loading-spinner-outer"
            style={{
              height: "100%",
              width: "100%",
            background: `${options.colorPrimary}`,
              zIndex: 99,
              position: 'relative',
              borderRadius: '50%',
              background: `${themes[options.theme].background}`,
            }}
          >
            {/* inner animated part of loading spinner */}
            <div
              className="react-loading-spinner-inner"
              style={{
                  display: 'flex',
                  justifyContent:'center',
                width: `100%`,
                height: '100%',
                background: `${themes[options.theme].foreground
}`,
                transition: `width ${options.smoothing} cubic-bezier(0.87, 0, 0.13, 1)`,
                borderRadius: "50%",

              }}
            >
                <div className="spinner-center-readout" style={{alignSelf:'center'}}>
                    {options.displayPercent && percentageElementSmart}
                </div>
            </div>
          </div>

         
        </div>
      </div>
    )
  }
  // DUMB COMPONENT RENDER
  else {
    return (
      // container element
      <div
        className="progress-spinner-dumb"
        style={{
          ...options.containerStyle,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          padding: "10px 0 10px 0",
          letterSpacing: "2px",
        }}
      >
        
      </div>
    )
  }
}

// propTypes
ProgressSpinner.propTypes = {
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
  /** {boolean} modal determines if this behaves like a normally styled component, or if the loader will behave like a modal, taking up the whole pages focus */
  modal: PropTypes.bool,
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
  /** {string || number} width in px of bar */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** {string || number} height of bar in px */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** {number} manually control progress of bar without providing an asset path/URL */
  percent: PropTypes.number,
  /** {boolean} if dumb, percent is controlled manually by percent parameter and not by component itself */
  dumb: PropTypes.bool,
  /** {boolean} manually trigger completion animation */
  triggerComplete: PropTypes.bool,
}

const animations = {}

// get smoothing rate
function parseSmoothing(string) {
  if (string) {
    switch (string) {
      case "low":
        return ".1s"
        break
      case "medium":
        return ".8s"
        break
      case "high":
        return "1.4s"
        break
      default:
        return ".8s"
    }
  }
}
