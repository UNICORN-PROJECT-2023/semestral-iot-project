import { Legend, Line, LineChart, ReferenceArea, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

function CustomTooltip({ active, payload, label, theme }) {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: theme.inputBackgroundColor,
                color: theme.inputTextColor,
                padding: '10px',
                border: `1px solid ${theme.tooltipBorderColor}`,
                borderRadius: '5px'
            }}>
                <p>{`Date: ${label}`}</p>
                <p>{`Temperature: ${payload[0].value}°C`}</p>
            </div>
        );
    }

    return null;
}

function Graph({ records, minTemperature, maxTemperature }) {
    const theme = useTheme();

    const OFFSET = 3;

    const formatXAxis = (tickItem) => {
        return format(new Date(tickItem), 'MMM d, yyyy'); // Customize the date format here
    };

    // transform only the date field from the records to this format Date(record.date).toLocaleString()
    records = records.map(record => {
        return {
            ...record,
            date: format(new Date(record.date), 'MMM d, yyyy, HH:mm:ss')
        };
    });

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
            <Tooltip content={<CustomTooltip theme={theme} />} />
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
