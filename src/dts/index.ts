export default `/// <amd-module name="@scom/scom-mixed-chart/global/interfaces.ts" />
declare module "@scom/scom-mixed-chart/global/interfaces.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { ModeType } from "@scom/scom-chart-data-source-setup";
    export interface IMixedChartOptions {
        xColumn?: {
            key: string;
            type: 'time' | 'category';
            timeFormat?: string;
        };
        yColumns?: string[];
        globalSeriesType: 'bar' | 'line' | 'area' | 'scatter';
        groupBy?: string;
        seriesOptions: {
            key: string;
            type: 'bar' | 'line' | 'area' | 'scatter';
            yAxis: 'left' | 'right';
            zIndex?: number;
            title?: string;
            color?: string;
        }[];
        stacking?: boolean;
        xAxis?: {
            title?: string;
            fontColor?: string;
            tickFormat?: string;
            reverseValues?: boolean;
        };
        leftYAxis?: {
            title?: string;
            fontColor?: string;
            tickFormat?: string;
            labelFormat?: string;
        };
        rightYAxis?: {
            title?: string;
            fontColor?: string;
            tickFormat?: string;
            labelFormat?: string;
        };
        mergeDuplicateData?: boolean;
        smooth?: boolean;
        legend?: {
            show?: boolean;
            fontColor?: string;
            scroll?: boolean;
            position?: 'top' | 'bottom' | 'left' | 'right';
        };
        padding?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        };
        showSymbol?: boolean;
        showDataLabels?: boolean;
        percentage?: boolean;
    }
    export interface IMixedChartConfig {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: IMixedChartOptions;
        file?: {
            cid: string;
            name: string;
        };
        mode: ModeType;
    }
    export interface IFormatNumberOptions {
        precision?: number;
        roundingMode?: BigNumber.RoundingMode;
    }
}
/// <amd-module name="@scom/scom-mixed-chart/global/utils.ts" />
declare module "@scom/scom-mixed-chart/global/utils.ts" {
    import { BigNumber } from '@ijstech/eth-wallet';
    export const isNumeric: (value: string | number | BigNumber) => boolean;
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const groupArrayByKey: (arr: [Date | string, string | number][], isMerged?: boolean) => (string | number | Date)[][];
    export const groupByCategory: (data: {
        [key: string]: any;
    }[], category: string, xAxis: string, yAxis: string) => {
        [key: string]: any;
    };
    export const extractUniqueTimes: (data: {
        [key: string]: any;
    }[], keyValue: string) => {
        [key: string]: any;
    };
    export const concatUnique: (obj1: {
        [key: string]: any;
    }, obj2: {
        [key: string]: any;
    }) => {};
    export const getChartType: (type: string, defaultType?: string) => string;
}
/// <amd-module name="@scom/scom-mixed-chart/global/index.ts" />
declare module "@scom/scom-mixed-chart/global/index.ts" {
    export * from "@scom/scom-mixed-chart/global/interfaces.ts";
    export * from "@scom/scom-mixed-chart/global/utils.ts";
}
/// <amd-module name="@scom/scom-mixed-chart/index.css.ts" />
declare module "@scom/scom-mixed-chart/index.css.ts" {
    export const containerStyle: string;
    export const textStyle: string;
    export const chartStyle: string;
}
/// <amd-module name="@scom/scom-mixed-chart/assets.ts" />
declare module "@scom/scom-mixed-chart/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-mixed-chart/data.json.ts" />
declare module "@scom/scom-mixed-chart/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            mode: string;
            dataSource: string;
            queryId: string;
            title: string;
            description: string;
            options: {
                xColumn: {
                    key: string;
                    type: string;
                };
                yColumns: string[];
                globalSeriesType: string;
                stacking: boolean;
                seriesOptions: ({
                    key: string;
                    title: string;
                    type: string;
                    yAxis: string;
                    color?: undefined;
                } | {
                    key: string;
                    title: string;
                    type: string;
                    yAxis: string;
                    color: string;
                })[];
                xAxis: {
                    title: string;
                    tickFormat: string;
                };
                leftYAxis: {
                    labelFormat: string;
                };
                rightYAxis: {
                    tickFormat: string;
                    labelFormat: string;
                };
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-mixed-chart/formSchema.ts" />
declare module "@scom/scom-mixed-chart/formSchema.ts" {
    export function getBuilderSchema(columns: string[]): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
        advanced: {
            dataSchema: {
                type: string;
                properties: {
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            xColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                                properties: {
                                    key: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                    type: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                    timeFormat: {
                                        type: string;
                                    };
                                };
                            };
                            yColumns: {
                                type: string;
                                title: string;
                                required: boolean;
                                items: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                            groupBy: {
                                type: string;
                                enum: string[];
                            };
                            globalSeriesType: {
                                type: string;
                                enum: string[];
                                required: boolean;
                            };
                            mergeDuplicateData: {
                                type: string;
                            };
                            smooth: {
                                type: string;
                            };
                            stacking: {
                                type: string;
                            };
                            legend: {
                                type: string;
                                properties: {
                                    show: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    scroll: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            showSymbol: {
                                type: string;
                            };
                            showDataLabels: {
                                type: string;
                            };
                            percentage: {
                                type: string;
                            };
                            padding: {
                                type: string;
                                title: string;
                                properties: {
                                    top: {
                                        type: string;
                                    };
                                    bottom: {
                                        type: string;
                                    };
                                    left: {
                                        type: string;
                                    };
                                    right: {
                                        type: string;
                                    };
                                };
                            };
                            xAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    reverseValues: {
                                        type: string;
                                    };
                                };
                            };
                            leftYAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                };
                            };
                            rightYAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                };
                            };
                            seriesOptions: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        key: {
                                            type: string;
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                        };
                                        type: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        yAxis: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        zIndex: {
                                            type: string;
                                        };
                                        color: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: ({
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                } | {
                    type: string;
                    elements: {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    }[];
                } | {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                })[];
            };
        };
    };
    export function getEmbedderSchema(columns: string[]): {
        dataSchema: {
            type: string;
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                    required: boolean;
                };
                description: {
                    type: string;
                };
                options: {
                    type: string;
                    title: string;
                    properties: {
                        xColumn: {
                            type: string;
                            title: string;
                            required: boolean;
                            properties: {
                                key: {
                                    type: string;
                                    enum: string[];
                                    required: boolean;
                                };
                                type: {
                                    type: string;
                                    enum: string[];
                                    required: boolean;
                                };
                                timeFormat: {
                                    type: string;
                                };
                            };
                        };
                        yColumns: {
                            type: string;
                            title: string;
                            required: boolean;
                            items: {
                                type: string;
                                enum: string[];
                            };
                        };
                        groupBy: {
                            type: string;
                            enum: string[];
                        };
                        globalSeriesType: {
                            type: string;
                            enum: string[];
                            required: boolean;
                        };
                        mergeDuplicateData: {
                            type: string;
                        };
                        smooth: {
                            type: string;
                        };
                        stacking: {
                            type: string;
                        };
                        legend: {
                            type: string;
                            properties: {
                                show: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                scroll: {
                                    type: string;
                                };
                                position: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                        };
                        showSymbol: {
                            type: string;
                        };
                        showDataLabels: {
                            type: string;
                        };
                        percentage: {
                            type: string;
                        };
                        padding: {
                            type: string;
                            title: string;
                            properties: {
                                top: {
                                    type: string;
                                };
                                bottom: {
                                    type: string;
                                };
                                left: {
                                    type: string;
                                };
                                right: {
                                    type: string;
                                };
                            };
                        };
                        xAxis: {
                            type: string;
                            properties: {
                                title: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                tickFormat: {
                                    type: string;
                                };
                                reverseValues: {
                                    type: string;
                                };
                            };
                        };
                        leftYAxis: {
                            type: string;
                            properties: {
                                title: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                tickFormat: {
                                    type: string;
                                };
                                labelFormat: {
                                    type: string;
                                };
                            };
                        };
                        rightYAxis: {
                            type: string;
                            properties: {
                                title: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                tickFormat: {
                                    type: string;
                                };
                                labelFormat: {
                                    type: string;
                                };
                            };
                        };
                        seriesOptions: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    key: {
                                        type: string;
                                        required: boolean;
                                    };
                                    title: {
                                        type: string;
                                    };
                                    type: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                    yAxis: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                    zIndex: {
                                        type: string;
                                    };
                                    color: {
                                        type: string;
                                        format: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        elements?: undefined;
                    } | {
                        type: string;
                        elements: {
                            type: string;
                            scope: string;
                            options: {
                                detail: {
                                    type: string;
                                };
                            };
                        }[];
                        scope?: undefined;
                    })[];
                }[];
            })[];
        };
    };
}
/// <amd-module name="@scom/scom-mixed-chart/dataOptionsForm.tsx" />
declare module "@scom/scom-mixed-chart/dataOptionsForm.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    interface IData {
        options: any;
    }
    interface ScomMixedChartDataOptionsFormElement extends ControlElement {
        dataSchema?: string;
        uiSchema?: string;
        options: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-mixed-chart-data-options-form"]: ScomMixedChartDataOptionsFormElement;
            }
        }
    }
    export default class ScomMixedChartDataOptionsForm extends Module {
        private formEl;
        private _dataSchema;
        private _uiSchema;
        private _data;
        constructor(parent?: Container, options?: any);
        get data(): IData;
        set data(value: IData);
        refreshFormData(): Promise<IData>;
        private renderUI;
        private onInputChanged;
        onCustomInputChanged(data: IData): Promise<void>;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-mixed-chart/dts/index.ts" />
declare module "@scom/scom-mixed-chart/dts/index.ts" {
    const _default_2: "/// <amd-module name=\"@scom/scom-mixed-chart/global/interfaces.ts\" />\ndeclare module \"@scom/scom-mixed-chart/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface IMixedChartOptions {\n        xColumn?: {\n            key: string;\n            type: 'time' | 'category';\n            timeFormat?: string;\n        };\n        yColumns?: string[];\n        globalSeriesType: 'bar' | 'line' | 'area' | 'scatter';\n        groupBy?: string;\n        seriesOptions: {\n            key: string;\n            type: 'bar' | 'line' | 'area' | 'scatter';\n            yAxis: 'left' | 'right';\n            zIndex?: number;\n            title?: string;\n            color?: string;\n        }[];\n        stacking?: boolean;\n        xAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            reverseValues?: boolean;\n        };\n        leftYAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            labelFormat?: string;\n        };\n        rightYAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            labelFormat?: string;\n        };\n        mergeDuplicateData?: boolean;\n        smooth?: boolean;\n        legend?: {\n            show?: boolean;\n            fontColor?: string;\n            scroll?: boolean;\n            position?: 'top' | 'bottom' | 'left' | 'right';\n        };\n        padding?: {\n            top?: number;\n            bottom?: number;\n            left?: number;\n            right?: number;\n        };\n        showSymbol?: boolean;\n        showDataLabels?: boolean;\n        percentage?: boolean;\n    }\n    export interface IMixedChartConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: IMixedChartOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/global/utils.ts\" />\ndeclare module \"@scom/scom-mixed-chart/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n    export const groupArrayByKey: (arr: [Date | string, string | number][], isMerged?: boolean) => (string | number | Date)[][];\n    export const groupByCategory: (data: {\n        [key: string]: any;\n    }[], category: string, xAxis: string, yAxis: string) => {\n        [key: string]: any;\n    };\n    export const extractUniqueTimes: (data: {\n        [key: string]: any;\n    }[], keyValue: string) => {\n        [key: string]: any;\n    };\n    export const concatUnique: (obj1: {\n        [key: string]: any;\n    }, obj2: {\n        [key: string]: any;\n    }) => {};\n    export const getChartType: (type: string, defaultType?: string) => string;\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/global/index.ts\" />\ndeclare module \"@scom/scom-mixed-chart/global/index.ts\" {\n    export * from \"@scom/scom-mixed-chart/global/interfaces.ts\";\n    export * from \"@scom/scom-mixed-chart/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/index.css.ts\" />\ndeclare module \"@scom/scom-mixed-chart/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const chartStyle: string;\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/assets.ts\" />\ndeclare module \"@scom/scom-mixed-chart/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/data.json.ts\" />\ndeclare module \"@scom/scom-mixed-chart/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            description: string;\n            options: {\n                xColumn: {\n                    key: string;\n                    type: string;\n                };\n                yColumns: string[];\n                globalSeriesType: string;\n                stacking: boolean;\n                seriesOptions: ({\n                    key: string;\n                    title: string;\n                    type: string;\n                    yAxis: string;\n                    color?: undefined;\n                } | {\n                    key: string;\n                    title: string;\n                    type: string;\n                    yAxis: string;\n                    color: string;\n                })[];\n                xAxis: {\n                    title: string;\n                    tickFormat: string;\n                };\n                leftYAxis: {\n                    labelFormat: string;\n                };\n                rightYAxis: {\n                    tickFormat: string;\n                    labelFormat: string;\n                };\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/formSchema.ts\" />\ndeclare module \"@scom/scom-mixed-chart/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            xColumn: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    type: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    timeFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yColumns: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                            groupBy: {\n                                type: string;\n                                enum: string[];\n                            };\n                            globalSeriesType: {\n                                type: string;\n                                enum: string[];\n                                required: boolean;\n                            };\n                            mergeDuplicateData: {\n                                type: string;\n                            };\n                            smooth: {\n                                type: string;\n                            };\n                            stacking: {\n                                type: string;\n                            };\n                            legend: {\n                                type: string;\n                                properties: {\n                                    show: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    scroll: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            showSymbol: {\n                                type: string;\n                            };\n                            showDataLabels: {\n                                type: string;\n                            };\n                            percentage: {\n                                type: string;\n                            };\n                            padding: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    top: {\n                                        type: string;\n                                    };\n                                    bottom: {\n                                        type: string;\n                                    };\n                                    left: {\n                                        type: string;\n                                    };\n                                    right: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            xAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    reverseValues: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            leftYAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    labelFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            rightYAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    labelFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            seriesOptions: {\n                                type: string;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        key: {\n                                            type: string;\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        yAxis: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        zIndex: {\n                                            type: string;\n                                        };\n                                        color: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: ({\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                } | {\n                    type: string;\n                    elements: {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    }[];\n                } | {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                })[];\n            };\n        };\n    };\n    export function getEmbedderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                    required: boolean;\n                };\n                description: {\n                    type: string;\n                };\n                options: {\n                    type: string;\n                    title: string;\n                    properties: {\n                        xColumn: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            properties: {\n                                key: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                type: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                timeFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yColumns: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            items: {\n                                type: string;\n                                enum: string[];\n                            };\n                        };\n                        groupBy: {\n                            type: string;\n                            enum: string[];\n                        };\n                        globalSeriesType: {\n                            type: string;\n                            enum: string[];\n                            required: boolean;\n                        };\n                        mergeDuplicateData: {\n                            type: string;\n                        };\n                        smooth: {\n                            type: string;\n                        };\n                        stacking: {\n                            type: string;\n                        };\n                        legend: {\n                            type: string;\n                            properties: {\n                                show: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                scroll: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        showSymbol: {\n                            type: string;\n                        };\n                        showDataLabels: {\n                            type: string;\n                        };\n                        percentage: {\n                            type: string;\n                        };\n                        padding: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                top: {\n                                    type: string;\n                                };\n                                bottom: {\n                                    type: string;\n                                };\n                                left: {\n                                    type: string;\n                                };\n                                right: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        xAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                reverseValues: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        leftYAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                labelFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        rightYAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                labelFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        seriesOptions: {\n                            type: string;\n                            items: {\n                                type: string;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        required: boolean;\n                                    };\n                                    title: {\n                                        type: string;\n                                    };\n                                    type: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    yAxis: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    zIndex: {\n                                        type: string;\n                                    };\n                                    color: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        scope: string;\n                        elements?: undefined;\n                    } | {\n                        type: string;\n                        elements: {\n                            type: string;\n                            scope: string;\n                            options: {\n                                detail: {\n                                    type: string;\n                                };\n                            };\n                        }[];\n                        scope?: undefined;\n                    })[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-mixed-chart/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomMixedChartDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-mixed-chart-data-options-form\"]: ScomMixedChartDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomMixedChartDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-mixed-chart/dts/index.ts\" />\ndeclare module \"@scom/scom-mixed-chart/dts/index.ts\" {\n    const _default_2: \"\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-mixed-chart\" />\ndeclare module \"@scom/scom-mixed-chart\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { IMixedChartConfig } from \"@scom/scom-mixed-chart/global/index.ts\";\n    interface ScomMixedChartElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: IMixedChartConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-mixed-chart']: ScomMixedChartElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: IMixedChartConfig;\n        };\n    }\n    export default class ScomMixedChart extends Module implements ICustomWidget {\n        private chartContainer;\n        private vStackInfo;\n        private pnlChart;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private columnNames;\n        private chartData;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomMixedChartElement, parent?: Container): Promise<ScomMixedChart>;\n        constructor(parent?: Container, options?: ScomMixedChartElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: IMixedChartConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: IMixedChartConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateChartData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderChart;\n        private resizeChart;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n";
    export default _default_2;
}
/// <amd-module name="@scom/scom-mixed-chart" />
declare module "@scom/scom-mixed-chart" {
    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';
    import { IMixedChartConfig } from "@scom/scom-mixed-chart/global/index.ts";
    interface ScomMixedChartElement extends ControlElement {
        lazyLoad?: boolean;
        data: IMixedChartConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-mixed-chart']: ScomMixedChartElement;
            }
        }
    }
    interface ICustomWidget {
        showConfigurator: (parent: Modal, prop: string) => void;
        register: () => {
            types: string;
            defaultData: IMixedChartConfig;
        };
    }
    export default class ScomMixedChart extends Module implements ICustomWidget {
        private chartContainer;
        private vStackInfo;
        private pnlChart;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private columnNames;
        private chartData;
        private _data;
        tag: any;
        defaultEdit: boolean;
        static create(options?: ScomMixedChartElement, parent?: Container): Promise<ScomMixedChart>;
        constructor(parent?: Container, options?: ScomMixedChartElement);
        showConfigurator(parent: Modal, prop: string): void;
        private onConfigSave;
        register(): {
            types: string;
            defaultData: IMixedChartConfig;
        };
        private getData;
        private setData;
        private getTag;
        private setTag;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            })[];
            getData: any;
            setData: (data: IMixedChartConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateChartData;
        private renderSnapshotData;
        private renderLiveData;
        private renderChart;
        private resizeChart;
        init(): Promise<void>;
        render(): any;
    }
}
`;