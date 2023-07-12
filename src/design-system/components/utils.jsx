import classNames from "classnames";
import PropTypes from "prop-types";

export const cn = (...props) => {
    return classNames(...props)
}

export const klogger = (type = "log", [...message]) => {
    switch (type) {
        case "log":
            console.log(...message)
            break
        case "error":
            console.error(...message)
            break
        case "warn":
            console.warn(...message)
            break
    }
}

