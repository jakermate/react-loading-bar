import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

/**
 * Usage:
 * ```js
 * <LoadingBar URL={videoAsset}
 *      theme={'basic'}
 *      dumb={false}
 *  />
 * ```
 */
function ProgressBar(props) {
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
    width: getWidth(props?.width) || 300,
    completeMessage: props?.completeMessage || "Done!",
    timeout: getTimeout(props?.smoothing) || 400
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
                setTimeout(()=>{
                  setReceived((old) => old + size)
                  console.log('Updating state from chunks.')
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

  // optional element components
  const percentageElement = ( //percentage tracker
    <div
      style={{
        marginTop: "10px",
        fontSize: "12px",
        opacity: !complete ? 1 : 0,
        transition: `opacity .4s ease-in`,
        transitionDelay: `${options.delay}s`,
        ...options.textStyle,
      }}
    >
      <div style={{ fontWeight: "light" }}>
        {isNaN(((received / size) * 100).toFixed(0))
          ? 0
          : ((received / size) * 100).toFixed(0)}
        <span style={{ fontWeight: "bold", position: "relative" }}>%</span>
      </div>
    </div>
  )
  const percentageElementDumb = ( //percentage tracker
    <div
      style={{
        marginTop: "10px",
        fontSize: "12px",
        opacity: !complete ? 1 : 0,
        transition: `opacity .4s ease-in`,
        transitionDelay: `${options.delay}s`,
        ...options.textStyle,
      }}
    >
      <div style={{ fontWeight: "light" }}>
        {props.percent}
        <span style={{ fontWeight: "bold", position: "relative" }}>%</span>
      </div>
    </div>
  )

  const hintElement = ( // hint element
    <div
      style={{
        marginTop: "10px",
        marginRight:`${options.showHint && options.displayPercent ? '8px' : '0'}`,
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
      background: "transparent",
      border: `1px solid ${options.colorPrimary}`,
      height: '2px'
    },

    outline: {
      background: "transparent",
      border: `2px solid ${options.colorPrimary}`,
      height: '10px'
    },
    minimal: {
      background: "rgba(255,255,255,.1)",
      border: `0px solid ${options.colorPrimary}`,
      height: '2px'
      
    },
    modern:{
      background: "rgba(255,255,255,.1)",
      border: 'none',
      borderRadius:'14px',
      height: '20px'
    }
  }

  //  SMART COMPONENT MARKUP
  if (!options.dumb) {
    return (
      // container element
      <div
        style={{
          ...options.containerStyle,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          padding: "10px 0 10px 0",
          letterSpacing: "2px",
        }}
      >
        <div
          style={{
            color: `${options.colorText}`,
            width: `${!complete ? `${options.width}px` : "0px"}`,
            transition: "width .4s cubic-bezier(0.36, 0, 0.66, -0.56)",
            transitionDelay: `${options.delay}s`,
          }}
        >
          {/* outer part of loading bar */}
          <div
            className="react-loading-bar-outer"
            style={{
              overflow:'hidden',
              border: `${themes[options.theme].border}`,
              borderRadius: "14px",
              background: `${themes[options.theme].background}`,
            }}
          >
            {/* inner animated part of loading bar */}
            <div
              className="react-loading-bar-inner"
              style={{
                width: `${((received / size) * 100).toFixed(0)}%`,
                height: `${themes[options.theme].height}`,
                background: `${options.colorPrimary}`,
                transition: `width ${options.smoothing} cubic-bezier(0.87, 0, 0.13, 1)`,
                borderRadius: "14px",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:'center'
            }}
          >
            {/*  hint messsage true/false */}
            {options.showHint && hintElement}
            {/* percentage readout true/false */}
            {options.displayPercent && percentageElement}
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
        style={{
          ...options.containerStyle,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          padding: "10px 0 10px 0",
          letterSpacing: "2px",
        }}
      >
        <div
          style={{
            color: `${options.colorText}`,
            width: `${!complete ? `${options.width}px` : "0px"}`,
            transition: "width .4s cubic-bezier(0.36, 0, 0.66, -0.56)",
            transitionDelay: `${options.delay}s`,
          }}
        >
          {/* outer part of loading bar */}
          <div
            className="react-loading-bar-outer"
            style={{
              width: "100%",
              overflow:'hidden',
              border: `${themes[options.theme].border}`,
              borderRadius: "14px",
              background: `${themes[options.theme].background}`,
            }}
          >
            {/* inner animated part of loading bar */}
            <div
              className="react-loading-bar-inner"
              style={{
                width: `${props.percent.toFixed(0) || 0}%`,
                height: `${themes[options.theme].height}`,
                background: `${options.colorPrimary}`,
                transition: `width ${options.smoothing} cubic-bezier(0.87, 0, 0.13, 1)`,
                borderRadius: "14px",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:'center'
            }}
          >
            {/*  hint messsage true/false */}
            {options.showHint && hintElement}
            {/* percentage readout true/false */}
            {options.displayPercent && percentageElementDumb}
          </div>
        </div>
      </div>
    )
  }
}

// propTypes
ProgressBar.propTypes = {
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
export default ProgressBar