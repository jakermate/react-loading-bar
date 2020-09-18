# react-progress-loaders
[Author](github.com/jakermate) | [Repo](github.com/jakermate/react-progress-bar)

### React components built using JS controlled and styled animations to accurately reflect the progress of large asset downloads to the client.  Built on the readableStream api, the goal of this project is to create a set of reusable and customizeable components that communicate to the user the progress of larger image and video asset load times.


:rocket:
## Installation
```js
import React from "react"
import ProgressBar from "react-progress-loaders"
import myvideo from "./video.mp4" // large video file

export default function MyApp(props){
    return(
        <div>
            <ProgressBar URL={myvideo}></ProgressBar>
        </div>
    )
}
```

<!-- ## Usage -->

## ProgressBar
A basic linear and horizontally shaped progress bar.

    import ProgressBar from 'react-progress-bar/ProgressBar'

| PropName    |  Type       | Defaults      |
| :---        |    :----:   |          ---: |
| URI         | string      | n/a           |
| style       | object      |               |

## ProgressSpinner