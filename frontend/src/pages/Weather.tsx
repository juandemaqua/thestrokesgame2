import { useEffect, useState } from "react";
// import { WeatherResponse } from "@full-stack/types";
// import { coinflip } from "@full-stack/common";
// import { Input, CloseButton } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { BACKEND_BASE_PATH } from "../constants/Navigation";

const getShit = (): Promise<any> =>
    fetch(`${BACKEND_BASE_PATH}/get-usernames`).then(async(res) => {
        const jsonRes = await res.json();
        console.log("Retrieved", jsonRes);
        return jsonRes;
    }).catch((err) => {
        console.log("Errored out", err);
    });

const Weather = () => {
    const [res, setRes] = useState([]);

    useEffect(() => {
        console.log("Loading weather...");
        getShit().then((data) => setRes(data));
    }, []);

    return (
        <div>
        <Autocomplete
            label="Your favorite library"
            placeholder="Pick value or enter anything"
            data={['Is This It', 'The Modern Age', 'Soma']}
        />
            <h1>Usernames:</h1>
            <p>{JSON.stringify(res)}</p>
        </div>
    );
};

export default Weather;
