import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const BarChart = ({ data }) => {
    useLayoutEffect(() => {
        let root = am5.Root.new('chartdiv');

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                paddingLeft: 0,
                wheelX: 'panX',
                wheelY: 'zoomX',
                layout: root.verticalLayout
            })
        );

        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        // Transforming the payload data
        let transformedData = [];
        let categories = new Set();

        data.forEach(item => {
            const { state_name, category, report_count } = item;
            let state = transformedData.find(state => state.state_name === state_name);
            if (!state) {
                state = { state_name };
                transformedData.push(state);
            }
            state[category] = report_count;
            categories.add(category);
        });

        // Convert the transformed data into the format required by amCharts
        let chartData = transformedData.map(item => {
            return { state_name: item.state_name, ...item };
        });

        let xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minorGridEnabled: true
        });

        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'state_name',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        xRenderer.grid.template.setAll({ location: 1 });

        xAxis.data.setAll(chartData);

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })
            })
        );

        function makeSeries(name, fieldName) {
            let series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: fieldName,
                    categoryXField: 'state_name'
                })
            );

            series.columns.template.setAll({
                tooltipText: '{name}, {categoryX}:{valueY}',
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.data.setAll(chartData);

            series.appear();

            series.bullets.push(() => {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: '{valueY}',
                        fill: root.interfaceColors.get('alternativeText'),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        categories.forEach(category => {
            makeSeries(category, category);
        });

        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [data]);

    return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default BarChart;
