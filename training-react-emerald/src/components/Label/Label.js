import React from 'react'
import PropTypes from 'prop-types'

export default function LabelCondor({tag, className, text}) {
    const CustomTag = `${tag}`;
    return (
        <CustomTag className={className}>
            {text}
        </CustomTag>
    )
}

LabelCondor.propTypes = {
    text: PropTypes.string.isRequired,
    tag: PropTypes.string,
    className: PropTypes.string
}

LabelCondor.defaultProps = {
    tag: "h1",
    className: "",
    text: "Label"
}