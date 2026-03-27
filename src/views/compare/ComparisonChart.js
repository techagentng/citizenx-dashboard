import React, { useRef, useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const ComparisonChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !data) return;

        // Clear previous chart
        chartRef.current.innerHTML = '';

        // Create root element
        const root = am5.Root.new(chartRef.current);
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: 'panX',
                wheelY: 'zoomX',
                pinchZoomX: true,
                layout: root.verticalLayout
            })
        );

        // Add cursor
        chart.set('cursor', am5xy.XYCursor.new(root, {
            xAxis: am5xy.DateAxis.new(root, {}),
            yAxis: am5xy.ValueAxis.new(root, {})
        }));

        // Create axes
        const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: 'day', count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: true,
                    panX: false
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })
            })
        );

        // Create series for each location
        const colors = [
            am5.color(0x6366f1), // Indigo
            am5.color(0x10b981), // Emerald
            am5.color(0xf59e0b), // Amber
            am5.color(0xef4444)  // Red
        ];

        data.locations.forEach((location, index) => {
            const series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: location.name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: 'count',
                    valueXField: 'date',
                    stroke: colors[index % colors.length],
                    strokeWidth: 3,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: 'horizontal',
                        labelText: '{name}: {valueY} reports on {valueX.formatDate("yyyy-MM-dd")}'
                    })
                })
            );

            // Add bullets
            series.bullets.push(() => {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: series.get('stroke'),
                        strokeWidth: 2,
                        stroke: am5.color(0xffffff)
                    })
                });
            });

            // Prepare data for this location
            const seriesData = location.time_series.map(item => ({
                date: new Date(item.date).getTime(),
                count: item.count
            }));

            series.data.setAll(seriesData);
        });

        // Add legend
        const legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50,
                layout: root.horizontalLayout
            })
        );

        // Add series to legend
        chart.series.each(series => {
            legend.data.push(series);
        });

        // Make chart animate
        chart.appear(1000, 100);

        // Cleanup
        return () => {
            root.dispose();
        };
    }, [data]);

    return (
        <Box sx={{ width: '100%', height: '500px' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        </Box>
    );
};

export default ComparisonChart;
