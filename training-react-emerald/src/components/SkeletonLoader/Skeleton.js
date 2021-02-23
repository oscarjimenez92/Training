import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { SkeletonLoader } from "emerald-ui/lib"

export default function SkeletonCondor({height, width, style, loading}) {
    const [visibleSkeleton, setVisible] = useState(false)
    useEffect(() => {
        setVisible(loading)
        return () => {
            setVisible(false)
        }
    }, [visibleSkeleton])

    return (
        <SkeletonLoader
          loading={visibleSkeleton}
          height={height}
          style={style}
          width={width}
        />
    )
}

SkeletonCondor.propTypes = {
    loading: PropTypes.bool.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object
}

SkeletonCondor.defaultProps = {
    loading: true,
    height: "",
    width: "",
    style: {}
}

