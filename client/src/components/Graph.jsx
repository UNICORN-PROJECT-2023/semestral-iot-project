import { Legend, Line, LineChart, ReferenceArea, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from 'styled-components';

function Graph({ records, minTemperature, maxTemperature }) {
    const theme = useTheme();

    const OFFSET = 3;

    return (
        <LineChart width={1000} height={400} data={records}>
            <XAxis dataKey="date" stroke={theme.textColor} />
            <YAxis domain={[minTemperature - OFFSET, maxTemperature + OFFSET]} stroke={theme.textColor} />
            <Tooltip />
            <Legend />
            {/*<ReferenceArea y1={minTemperature - OFFSET} y2={minTemperature} strokeOpacity={0.3} fill="red" fillOpacity={0.5} label="LOW" />*/}
            <ReferenceLine y={minTemperature} stroke="red" label={"MIN"} />
            <ReferenceLine y={maxTemperature} stroke="red" label={"MAX"} />
            {/*<ReferenceArea y1={minTemperature} y2={maxTemperature} strokeOpacity={0.3} fill="green" fillOpacity={0.3} label="OK" />*/}
            {/*<ReferenceArea y1={maxTemperature} y2={maxTemperature + OFFSET} strokeOpacity={0.3} fill="red" fillOpacity={0.5} label="HIGH" />*/}
            <Line type="monotone" dataKey="temperature" stroke={theme.lineColor} activeDot={{ r: 8, fill: theme.activeDotColor }} />
        </LineChart>
    );
}

export default Graph;
