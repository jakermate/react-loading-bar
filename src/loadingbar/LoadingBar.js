import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'


/**
 * 
 * Usage:
 * ```js
 * <LoadingBar URI={videoAsset}
 *      options={{
 *          hint: 'Video is loading',
 *          showHint: true
 * }} />
 * ```
 * URI asset should be either an asset imported to variable, or a literal string.
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

  // start fetch and create readable stream
  useEffect(() => {}, []) // call upon component mount
  return (
    // container element
    <div
      style={{
        width: "200px",
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
            width: `${progress}%`,
            height: "100%",
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
    URI: PropTypes.string,
    options: PropTypes.object,
    style: PropTypes.object
}