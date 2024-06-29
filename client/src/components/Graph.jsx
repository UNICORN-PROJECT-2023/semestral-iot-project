import { Legend, Line, LineChart, ReferenceArea, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

function Graph({ records, minTemperature, maxTemperature }) {
    const theme = useTheme();

    const OFFSET = 3;

    const formatXAxis = (tickItem) => {
        return format(new Date(tickItem), 'MMM d, yyyy'); // Customize the date format here
    };

    return (
        <LineChart width={1000} height={400} data={records}>
            <XAxis
                dataKey="date"
                stroke={theme.textColor}
                tickFormatter={formatXAxis} // Add the tickFormatter property
            />
            <YAxis
                domain={[minTemperature - OFFSET, maxTemperature + OFFSET]}
                stroke={theme.textColor}
            />
            <Tooltip />
            <Legend />
            <ReferenceLine y={minTemperature} stroke="red" label={"MIN"} />
            <ReferenceLine y={maxTemperature} stroke="red" label={"MAX"} />
            <Line
                type="monotone"
                dataKey="temperature"
                stroke={theme.lineColor}
                activeDot={{ r: 8, fill: theme.activeDotColor }}
            />
        </LineChart>
    );
}

export default Graph;
