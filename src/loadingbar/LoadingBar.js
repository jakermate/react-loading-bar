import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import earth from "../earthspin.mp4"

/**
 * Usage:
 * ```js
 * <LoadingBar URI={videoAsset}
 *      options={{
 *          hint: 'Video is loading',
 *          showHint: true
 * }} />
 * ```
 */
export default function LoadingBar(props) {
  // get URI for resource to load/download
  const URI = props.URI // this will need to throw error if not present
  if (!URI) {
    console.log(URI)
    // catch missing prop error
    throw new Error(
      "URI for file to download is required. (URI prop in LoadingBar component.)"
    )
  }

  // load styles from props or use defaults
  const styleProps = { ...props?.style } // use optional chain to determine if prop is provided
  const style = {
    borderColor: styleProps.borderColor || styleProps.borderColor || "black",
    height: styleProps.borderColor || "30px",
  }

  // set options from props or use defaults
  const optionsProps = { ...props?.options }
  const options = {
    displayPercent: optionsProps.displayPercent || true,
    hint: optionsProps.hint || "Downloading",
    showHint: optionsProps.showHint || false,
  }

  // setup state for readable stream progress
  const [progress, setProgress] = useState(0)
  const [size, setSize] = useState(0)
  const [received, setReceived] = useState(0)
  const [complete, setComplete] = useState(false)
  // start fetch and create readable stream
  useEffect(() => {
    get()
  }, []) // call upon component mount

  // second order functions passed in via props
  const onComplete = props.onComplete || null

  function get() {
    fetch(earth)
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
  useEffect(()=>{
    // if stream is complete and onComplete callback is provided, run callback
    if(complete && onComplete && typeof onComplete === 'function'){
        onComplete()
    }
    return
  }, [complete])

  // chunk read callback
  useEffect(() => {
    console.log(received)
  }, [received])

  //   render
  return (
    // container element
    <div
      style={{
        width: "300px",
      }}
    >
      {/* outer part of loading bar */}
      <div
        className="react-loading-bar-outer"
        style={{
          height: styleProps.height,
          padding: "4px",
          border: "1px solid black",
        }}
      >
        {/* inner animated part of loading bar */}
        <div
          className="react-loading-bar-inner"
          style={{
            width: `${(received / size) * 100}%`,
            height: "20px",
            background: "black",
          }}
        ></div>
      </div>

      {/*  hint container, only render if hint is enabled */}
      {options.showHint && (
        <div
          style={{
            width: "100%",
          }}
        >
          {options.hint}
        </div>
      )}
    </div>
  )
}

// propTypes
LoadingBar.propTypes = {
  /** {string} of path to asset location. */
  URI: PropTypes.string,
  /** {object} containing user defined styles in react inline-styles format. */
  style: PropTypes.object,
  /** {string} for use in list via array.map function */
  key: PropTypes.string,
  /** {function}: callback to fire (in parent component) on completion of download */
  onComplete: PropTypes.func,
  /** {string} message to display after download is complete */
  doneMessage: PropTypes.string,
  /** {boolean} modal determines if this behaves like a normally styled component, or if the loader will behave like a modal, taking up the whole pages focus */
  modal: PropTypes.bool,
  /** {boolean} display percentage complete in addition to progress bar */
  displayPercent: PropTypes.bool,
  /** {string} message to display while in progress */
  hint: PropTypes.string,
  /** {boolean} to show/hide hint message */
  showHint: PropTypes.bool,
  /** {string: low, medium, high} determines how smooth the animation of the progress bar is*/
  smoothing: PropTypes.string
}
