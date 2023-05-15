import {useCallback, useEffect, useMemo, useState} from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";


interface Props {
    leaves: any[]
}

export default function StarbucksPop({leaves}: Props) {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        setIndex(0)
    }, [leaves])

    const next = useCallback(() => {
        setIndex((curr) => curr + 1);
    }, [setIndex]);

    const prev = useCallback(() => {
        setIndex((curr) => curr - 1);
    }, [setIndex]);

    const prevdisabled = useMemo(() => index === 0, [index])
    const nextdisabled = useMemo(() => index === leaves.length - 1, [index, leaves.length]);

    if(!leaves[index]) return <></>

    return (
      <div>
        <button disabled={prevdisabled} onClick={prev}><FaArrowLeft /></button>
        <button disabled={nextdisabled} onClick={next}><FaArrowRight /></button>
        <p>{leaves[index].city}</p>
        <p>{leaves[index].street_address}</p>
        <p>{leaves[index].properties.phone_number_1}</p>
      </div>
    )
}