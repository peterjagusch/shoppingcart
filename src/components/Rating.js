import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const Rating = ({ rating, onClick, style }) => {
    const stars = [1,2,3,4,5] 
    return (
        <>
            {[stars.map((_, i) => (
                 <span key={i} onClick={() => onClick(i)} style={style}>
                    {rating > i ? (
                        <AiFillStar fontSize="15px" />
                    ) : (
                        <AiOutlineStar fontSize="15px" />
                    )}
                </span>
            ))]
            }
        </>
    )
}

export default Rating