import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from "emerald-ui/lib"

export default function ButtonCondor({style, loading, progress, disabled, type, color, className, tabIndex, onClick, text}) {

    return (
        <Button style={style} type={type} loading={loading} progress={progress} disabled={disabled} className={className} tabIndex={tabIndex} color={color} onClick={onClick}>
            {text}
        </Button>
    )

}

ButtonCondor.propTypes = {
    loading: PropTypes.bool, 
    progress: PropTypes.number, 
    disabled: PropTypes.bool, 
    type: PropTypes.string, 
    color: PropTypes.string, 
    className: PropTypes.string, 
    tabIndex: PropTypes.string, 
    onClick: PropTypes.func
} 

ButtonCondor.defaultProps = {
    loading: false, 
    progress: 0, 
    disabled: false, 
    type: "button", 
    color: "default", 
    className: "", 
    tabIndex: "", 
    onClick: () => {}
} 