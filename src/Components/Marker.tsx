import {Marker} from "react-map-gl";
import {AnyProps, PointFeature} from "supercluster";
import {IData} from "../type";
import { Box, Center } from "@chakra-ui/react";
import {useMemo} from "react";
import {FaMapPin} from "react-icons/fa";

interface Props {
    lat: number,
    lon: number,
    count: number,
    prop: IData | undefined,
    leaves: PointFeature<AnyProps>[],
    onClick: (datum: IData | undefined, latLng: [number, number], leaves: PointFeature<AnyProps>[]) => void,
}

export default function CustomMarker({lat, lon, onClick, prop, count, leaves}: Props) {
    const Child = useMemo(() => {
        if (prop) {
            return <FaMapPin size={30}/>
        }

        return (
            <Box width={30} height={30} bg={'white'} color={'black'} borderRadius={5}>
                <Center height={30}>
                    {`${count}`}
                </Center>
            </Box>
        )
    }, [lat, lon, prop])


    return (
        <Marker onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClick(prop, [lat, lon], leaves);
        }} latitude={lat} longitude={lon}>
            {Child}
        </Marker>
    )
}