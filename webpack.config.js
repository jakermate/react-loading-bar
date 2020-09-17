const path = require('path')
module.exports = {
    "mode": "development",
    "entry": {
        "ProgressBar": "./src/loaders/ProgressBar.js",
        "ProgressSpinner": "./src/loaders/ProgressSpinner.js"
    },
    "output": {
        "path": path.resolve(__dirname, 'lib'),
        "filename": "[name].js"
    },
    "module": {
        "rules": [
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        
                    }
                }
            }
        ]
    }
}