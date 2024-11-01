var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-mixed-chart/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-mixed-chart/global/utils.ts", ["require", "exports", "@ijstech/eth-wallet", "@ijstech/components"], function (require, exports, eth_wallet_1, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChartType = exports.concatUnique = exports.extractUniqueTimes = exports.groupByCategory = exports.groupArrayByKey = exports.formatNumberByFormat = exports.formatNumber = exports.isNumeric = void 0;
    const isNumeric = (value) => {
        if (value instanceof eth_wallet_1.BigNumber) {
            return !value.isNaN() && value.isFinite();
        }
        if (typeof value === 'string') {
            const parsed = new eth_wallet_1.BigNumber(value);
            return !parsed.isNaN() && parsed.isFinite();
        }
        return !isNaN(value) && isFinite(value);
    };
    exports.isNumeric = isNumeric;
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${components_1.FormatUtils.formatNumber(num, { decimalFigures: 2 })}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: decimals, shortScale: true });
        }
        if (absNum < 0.0000001) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 0 });
        }
        if (absNum < 0.00001) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 6 });
        }
        if (absNum < 1) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 4 });
        }
        return components_1.FormatUtils.formatNumber(num, { decimalFigures: 2 });
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        if (!format)
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 0 });
        const decimalFigures = format.split('.')[1] ? format.split('.')[1].length : 0;
        if (format.includes('%')) {
            return components_1.FormatUtils.formatNumber((num * 100), { decimalFigures }) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = components_1.FormatUtils.formatNumber(num, { decimalFigures });
        if (separators || !(format.includes('m') || format.includes('a'))) {
            return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const groupArrayByKey = (arr, isMerged) => {
        if (!isMerged)
            return arr;
        const groups = new Map();
        for (const [key, value] of arr) {
            const strKey = key instanceof Date ? key.getTime().toString() : key.toString();
            const existingValue = groups.get(strKey);
            if (existingValue !== undefined) {
                if (typeof existingValue === 'number' && typeof value === 'number') {
                    groups.set(strKey, existingValue + value);
                }
                else {
                    groups.set(strKey, value);
                }
            }
            else {
                groups.set(strKey, value);
            }
        }
        return Array.from(groups.entries()).map(([key, value]) => {
            const parsedKey = isNaN(Number(key)) ? key : new Date(Number(key));
            return [parsedKey, value];
        });
    };
    exports.groupArrayByKey = groupArrayByKey;
    const groupByCategory = (data, category, xAxis, yAxis) => {
        return data.reduce((result, item) => {
            const _category = item[category];
            if (!result[_category]) {
                result[_category] = {};
            }
            result[_category][item[xAxis]] = item[yAxis];
            return result;
        }, {});
    };
    exports.groupByCategory = groupByCategory;
    const extractUniqueTimes = (data, keyValue) => {
        return data.reduce((acc, cur) => {
            if (!acc.hasOwnProperty(cur[keyValue])) {
                acc[cur[keyValue]] = null;
            }
            return acc;
        }, {});
    };
    exports.extractUniqueTimes = extractUniqueTimes;
    const concatUnique = (obj1, obj2) => {
        const merged = { ...obj1, ...obj2 };
        return Object.keys(merged).reduce((acc, key) => {
            if (!acc.hasOwnProperty(key)) {
                acc[key] = merged[key];
            }
            return acc;
        }, {});
    };
    exports.concatUnique = concatUnique;
    const getChartType = (type, defaultType) => {
        switch (type) {
            case 'area':
                return 'line';
            default:
                return type || defaultType;
        }
    };
    exports.getChartType = getChartType;
});
define("@scom/scom-mixed-chart/global/index.ts", ["require", "exports", "@scom/scom-mixed-chart/global/interfaces.ts", "@scom/scom-mixed-chart/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-mixed-chart/global/index.ts'/> 
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-mixed-chart/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chartStyle = exports.textStyle = exports.containerStyle = void 0;
    exports.containerStyle = components_2.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10,
        background: 'var(--custom-background-color, var(--background-main))'
    });
    exports.textStyle = components_2.Styles.style({
        color: 'var(--custom-text-color, var(--text-primary))'
    });
    exports.chartStyle = components_2.Styles.style({
        display: 'block',
    });
});
define("@scom/scom-mixed-chart/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_3.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-mixed-chart/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-mixed-chart/data.json.ts'/> 
    exports.default = {
        defaultBuilderData: {
            // apiEndpoint: "/dune/query/1333833",
            "mode": "Live",
            "dataSource": "Dune",
            "queryId": "1333833",
            title: 'Reserve Cumulative Value',
            description: 'Radiant Capital Reserve Markets (Weekly % change)',
            options: {
                xColumn: {
                    key: 'time',
                    type: 'time'
                },
                yColumns: [
                    'cumulative_dai',
                    'cumulative_usdc',
                    'cumulative_usdt',
                    'cumulative_wbtc',
                    'cumulative_weth',
                    'cumulative_tokens_value',
                    'cumulative_diff'
                ],
                globalSeriesType: 'area',
                stacking: true,
                seriesOptions: [
                    {
                        key: 'cumulative_dai',
                        title: 'DAI',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_usdc',
                        title: 'USDC',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_usdt',
                        title: 'USDT',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_wbtc',
                        title: 'WBTC',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_weth',
                        title: 'WETH',
                        type: 'area',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_tokens_value',
                        title: 'Total',
                        type: 'scatter',
                        yAxis: 'left'
                    },
                    {
                        key: 'cumulative_diff',
                        title: '% Change',
                        type: 'line',
                        yAxis: 'right',
                        color: '#ff0000'
                    }
                ],
                xAxis: {
                    title: 'Date',
                    tickFormat: 'MMM DD'
                },
                leftYAxis: {
                    labelFormat: '$0[].0a'
                },
                rightYAxis: {
                    tickFormat: '0[].0%',
                    labelFormat: '0[].0%'
                }
            }
        }
    };
});
define("@scom/scom-mixed-chart/formSchema.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmbedderSchema = exports.getBuilderSchema = void 0;
    ///<amd-module name='@scom/scom-mixed-chart/formSchema.ts'/> 
    function visualizationOptions(columns) {
        return {
            type: 'object',
            title: 'Visualization Options',
            properties: {
                xColumn: {
                    type: 'object',
                    title: 'X column',
                    required: true,
                    properties: {
                        key: {
                            type: 'string',
                            enum: columns,
                            required: true
                        },
                        type: {
                            type: 'string',
                            enum: ['time', 'category'],
                            required: true
                        },
                        timeFormat: {
                            type: 'string'
                        }
                    }
                },
                yColumns: {
                    type: 'array',
                    title: 'Y columns',
                    required: true,
                    items: {
                        type: 'string',
                        enum: columns
                    }
                },
                groupBy: {
                    type: 'string',
                    enum: ['', ...columns]
                },
                globalSeriesType: {
                    type: 'string',
                    enum: [
                        'bar',
                        'line',
                        'area',
                        'scatter'
                    ],
                    required: true
                },
                mergeDuplicateData: {
                    type: 'boolean'
                },
                smooth: {
                    type: 'boolean'
                },
                stacking: {
                    type: 'boolean'
                },
                legend: {
                    type: 'object',
                    properties: {
                        show: {
                            type: 'boolean'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        scroll: {
                            type: 'boolean'
                        },
                        position: {
                            type: 'string',
                            enum: ['top', 'bottom', 'left', 'right']
                        }
                    }
                },
                showSymbol: {
                    type: 'boolean'
                },
                showDataLabels: {
                    type: 'boolean'
                },
                percentage: {
                    type: 'boolean'
                },
                padding: {
                    type: 'object',
                    title: 'Padding (px)',
                    properties: {
                        top: {
                            type: 'number'
                        },
                        bottom: {
                            type: 'number'
                        },
                        left: {
                            type: 'number'
                        },
                        right: {
                            type: 'number'
                        }
                    }
                },
                xAxis: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        tickFormat: {
                            type: 'string'
                        },
                        reverseValues: {
                            type: 'boolean'
                        }
                    }
                },
                leftYAxis: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        tickFormat: {
                            type: 'string'
                        },
                        labelFormat: {
                            type: 'string'
                        }
                    }
                },
                rightYAxis: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
                        },
                        tickFormat: {
                            type: 'string'
                        },
                        labelFormat: {
                            type: 'string'
                        }
                    }
                },
                seriesOptions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                                required: true
                            },
                            title: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'bar',
                                    'line',
                                    'area',
                                    'scatter'
                                ],
                                required: true
                            },
                            yAxis: {
                                type: 'string',
                                enum: [
                                    'left',
                                    'right'
                                ],
                                required: true
                            },
                            zIndex: {
                                type: 'number'
                            },
                            color: {
                                type: 'string',
                                format: 'color'
                            }
                        }
                    }
                }
            }
        };
    }
    const theme = {
        darkShadow: {
            type: 'boolean'
        },
        customFontColor: {
            type: 'boolean'
        },
        fontColor: {
            type: 'string',
            format: 'color'
        },
        customBackgroundColor: {
            type: 'boolean'
        },
        backgroundColor: {
            type: 'string',
            format: 'color'
        },
        height: {
            type: 'string'
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/customFontColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/fontColor',
                                rule: {
                                    effect: 'ENABLE',
                                    condition: {
                                        scope: '#/properties/customFontColor',
                                        schema: {
                                            const: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/customBackgroundColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/backgroundColor',
                                rule: {
                                    effect: 'ENABLE',
                                    condition: {
                                        scope: '#/properties/customBackgroundColor',
                                        schema: {
                                            const: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/darkShadow'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/height'
                            }
                        ]
                    }
                ]
            }
        ]
    };
    function getBuilderSchema(columns) {
        return {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    ...theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/title'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/description'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            },
            advanced: {
                dataSchema: {
                    type: 'object',
                    properties: {
                        options: visualizationOptions(columns)
                    }
                },
                uiSchema: {
                    type: 'VerticalLayout',
                    elements: [
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/xColumn'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/yColumns'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/groupBy'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/globalSeriesType'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/mergeDuplicateData'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/smooth'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/stacking'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/legend'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/showSymbol'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/showDataLabels'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/percentage'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Group',
                                    label: 'Padding (px)',
                                    elements: [
                                        {
                                            type: 'HorizontalLayout',
                                            elements: [
                                                {
                                                    type: 'Control',
                                                    scope: '#/properties/options/properties/padding/properties/top',
                                                },
                                                {
                                                    type: 'Control',
                                                    scope: '#/properties/options/properties/padding/properties/bottom',
                                                },
                                                {
                                                    type: 'Control',
                                                    scope: '#/properties/options/properties/padding/properties/left',
                                                },
                                                {
                                                    type: 'Control',
                                                    scope: '#/properties/options/properties/padding/properties/right',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/xAxis'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/leftYAxis'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/rightYAxis'
                                }
                            ]
                        },
                        {
                            type: 'HorizontalLayout',
                            elements: [
                                {
                                    type: 'Control',
                                    scope: '#/properties/options/properties/seriesOptions',
                                    options: {
                                        detail: {
                                            type: 'VerticalLayout'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    function getEmbedderSchema(columns) {
        return {
            dataSchema: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        required: true
                    },
                    description: {
                        type: 'string'
                    },
                    options: visualizationOptions(columns),
                    ...theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/title'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/description'
                                    },
                                    {
                                        type: 'HorizontalLayout',
                                        elements: [
                                            {
                                                type: 'Control',
                                                scope: '#/properties/options',
                                                options: {
                                                    detail: {
                                                        type: 'VerticalLayout'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getEmbedderSchema = getEmbedderSchema;
});
define("@scom/scom-mixed-chart/dataOptionsForm.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomMixedChartDataOptionsForm = class ScomMixedChartDataOptionsForm extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this.renderUI();
        }
        async refreshFormData() {
            this._data = await this.formEl.getFormData();
            return this._data;
        }
        renderUI() {
            this.formEl.clearInnerHTML();
            this.formEl.jsonSchema = JSON.parse(this._dataSchema);
            this.formEl.uiSchema = JSON.parse(this._uiSchema);
            this.formEl.formOptions = {
                columnWidth: '100%',
                columnsPerRow: 1,
                confirmButtonOptions: {
                    hide: true
                }
            };
            this.formEl.renderForm();
            this.formEl.clearFormData();
            this.formEl.setFormData(this._data);
            const inputs = this.formEl.querySelectorAll('[scope]');
            for (let input of inputs) {
                const inputEl = input;
                inputEl.onChanged = this.onInputChanged;
            }
        }
        async onInputChanged() {
            const data = await this.formEl.getFormData();
            await this.onCustomInputChanged(data);
        }
        async onCustomInputChanged(data) {
        }
        async init() {
            super.init();
            this.onInputChanged = this.onInputChanged.bind(this);
            const dataSchema = this.getAttribute('dataSchema', true);
            this._dataSchema = dataSchema;
            const uiSchema = this.getAttribute('uiSchema', true);
            this._uiSchema = uiSchema;
            const options = this.getAttribute('options', true, {});
            this.data = {
                options
            };
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-vstack", { gap: '0.5rem' },
                    this.$render("i-panel", { id: 'pnlForm' },
                        this.$render("i-form", { id: 'formEl' })))));
        }
    };
    ScomMixedChartDataOptionsForm = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-mixed-chart-data-options-form')
    ], ScomMixedChartDataOptionsForm);
    exports.default = ScomMixedChartDataOptionsForm;
});
define("@scom/scom-mixed-chart/dts/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-mixed-chart/dts/index.ts'/> 
    exports.default = `/// <amd-module name="@scom/scom-mixed-chart/global/interfaces.ts" />
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
});
define("@scom/scom-mixed-chart", ["require", "exports", "@ijstech/components", "@scom/scom-charts", "@scom/scom-mixed-chart/global/index.ts", "@scom/scom-mixed-chart/index.css.ts", "@scom/scom-mixed-chart/assets.ts", "@scom/scom-mixed-chart/data.json.ts", "@scom/scom-chart-data-source-setup", "@scom/scom-mixed-chart/formSchema.ts", "@scom/scom-mixed-chart/dataOptionsForm.tsx", "@scom/scom-mixed-chart/dts/index.ts"], function (require, exports, components_5, scom_charts_1, index_1, index_css_1, assets_1, data_json_1, scom_chart_data_source_setup_1, formSchema_1, dataOptionsForm_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    const DefaultData = {
        dataSource: scom_chart_data_source_setup_1.DataSource.Dune,
        queryId: '',
        apiEndpoint: '',
        title: '',
        options: undefined,
        mode: scom_chart_data_source_setup_1.ModeType.LIVE
    };
    let ScomMixedChart = class ScomMixedChart extends components_5.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.columnNames = [];
            this.chartData = [];
            this._data = DefaultData;
            this.tag = {};
            this.defaultEdit = true;
        }
        showConfigurator(parent, prop) {
            const props = this._getDesignPropValue('data');
            const builderTarget = this.getConfigurators().find((conf) => conf.target === 'Builders');
            const dataAction = builderTarget?.getActions().find((action) => action.name === prop);
            const self = this;
            if (dataAction) {
                const control = dataAction.customUI.render(props, (result, data) => {
                    parent.visible = false;
                    self.onConfigSave(data);
                });
                parent.item = control;
                parent.visible = true;
            }
        }
        onConfigSave(data) {
            this._setDesignPropValue('data', data);
            this.setData({ ...data });
        }
        register() {
            return { types: index_2.default, defaultData: data_json_1.default.defaultBuilderData };
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.updateChartData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value, fromParent) {
            if (fromParent) {
                this.tag.parentFontColor = value.fontColor;
                this.tag.parentCustomFontColor = value.customFontColor;
                this.tag.parentBackgroundColor = value.backgroundColor;
                this.tag.parentCustomBackgroundColor = value.customBackgoundColor;
                this.tag.customWidgetsBackground = value.customWidgetsBackground;
                this.tag.widgetsBackground = value.widgetsBackground;
                this.tag.customWidgetsColor = value.customWidgetsColor;
                this.tag.widgetsColor = value.widgetsColor;
                this.onUpdateBlock();
                return;
            }
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.width = this.tag.width || 700;
            this.height = this.tag.height || 500;
            this.onUpdateBlock();
        }
        _getActions(dataSchema, uiSchema, advancedSchema) {
            const builderSchema = (0, formSchema_1.getBuilderSchema)(this.columnNames);
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = DefaultData;
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { title, description, options, ...themeSettings } = userInputData;
                                const generalSettings = {
                                    title,
                                    description,
                                };
                                if (advancedSchema) {
                                    this._data = { ...this._data, ...generalSettings };
                                }
                                else {
                                    this._data = { ...generalSettings, options };
                                }
                                if (builder?.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder?.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    oldData = { ...oldData, options: this._data.options };
                                if (builder?.setData)
                                    builder.setData(oldData);
                                this.setData(oldData);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder?.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema
                },
                {
                    name: 'Data',
                    icon: 'database',
                    command: (builder, userInputData) => {
                        let _oldData = DefaultData;
                        return {
                            execute: async () => {
                                _oldData = { ...this._data };
                                if (userInputData?.mode)
                                    this._data.mode = userInputData?.mode;
                                if (userInputData?.file)
                                    this._data.file = userInputData?.file;
                                if (userInputData?.dataSource)
                                    this._data.dataSource = userInputData?.dataSource;
                                if (userInputData?.queryId)
                                    this._data.queryId = userInputData?.queryId;
                                if (userInputData?.apiEndpoint)
                                    this._data.apiEndpoint = userInputData?.apiEndpoint;
                                if (userInputData?.options !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder?.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder?.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: (data, onConfirm, onChange) => {
                            const vstack = new components_5.VStack(null, { gap: '1rem' });
                            const dataSourceSetup = new scom_chart_data_source_setup_1.default(null, {
                                ...this._data,
                                chartData: JSON.stringify(this.chartData),
                                onCustomDataChanged: async (dataSourceSetupData) => {
                                    if (onChange) {
                                        onChange(true, {
                                            ...this._data,
                                            ...dataSourceSetupData
                                        });
                                    }
                                }
                            });
                            const hstackBtnConfirm = new components_5.HStack(null, {
                                verticalAlignment: 'center',
                                horizontalAlignment: 'end'
                            });
                            const button = new components_5.Button(null, {
                                caption: 'Confirm',
                                width: 'auto',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText },
                                padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }
                            });
                            hstackBtnConfirm.append(button);
                            vstack.append(dataSourceSetup);
                            const dataOptionsForm = new dataOptionsForm_1.default(null, {
                                options: this._data.options,
                                dataSchema: JSON.stringify(advancedSchema),
                                uiSchema: JSON.stringify(builderSchema.advanced.uiSchema)
                            });
                            vstack.append(dataOptionsForm);
                            vstack.append(hstackBtnConfirm);
                            if (onChange) {
                                dataOptionsForm.onCustomInputChanged = async (optionsFormData) => {
                                    onChange(true, {
                                        ...this._data,
                                        ...optionsFormData,
                                        ...dataSourceSetup.data
                                    });
                                };
                            }
                            button.onClick = async () => {
                                const { dataSource, file, mode } = dataSourceSetup.data;
                                if (mode === scom_chart_data_source_setup_1.ModeType.LIVE && !dataSource)
                                    return;
                                if (mode === scom_chart_data_source_setup_1.ModeType.SNAPSHOT && !file?.cid)
                                    return;
                                if (onConfirm) {
                                    const optionsFormData = await dataOptionsForm.refreshFormData();
                                    onConfirm(true, {
                                        ...this._data,
                                        ...optionsFormData,
                                        ...dataSourceSetup.data
                                    });
                                }
                            };
                            return vstack;
                        }
                    }
                }
            ];
            // if (advancedSchema) {
            //   const advanced = {
            //     name: 'Advanced',
            //     icon: 'sliders-h',
            //     command: (builder: any, userInputData: any) => {
            //       let _oldData: IMixedChartOptions = { globalSeriesType: 'line', seriesOptions: [] };
            //       return {
            //         execute: async () => {
            //           _oldData = { ...this._data?.options };
            //           if (userInputData?.options !== undefined) this._data.options = userInputData.options;
            //           if (builder?.setData) builder.setData(this._data);
            //           this.setData(this._data);
            //         },
            //         undo: () => {
            //           this._data.options = { ..._oldData };
            //           if (builder?.setData) builder.setData(this._data);
            //           this.setData(this._data);
            //         },
            //         redo: () => { }
            //       }
            //     },
            //     userInputDataSchema: advancedSchema,
            //     userInputUISchema: builderSchema.advanced.uiSchema
            //   }
            //   actions.push(advanced);
            // }
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const builderSchema = (0, formSchema_1.getBuilderSchema)(this.columnNames);
                        const dataSchema = builderSchema.dataSchema;
                        const uiSchema = builderSchema.uiSchema;
                        const advancedSchema = builderSchema.advanced.dataSchema;
                        return this._getActions(dataSchema, uiSchema, advancedSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData({ ...defaultData, ...data });
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        const embedderSchema = (0, formSchema_1.getEmbedderSchema)(this.columnNames);
                        const dataSchema = embedderSchema.dataSchema;
                        const uiSchema = embedderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = {
                                ...self._data,
                                ...newData
                            };
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            if (this.chartContainer) {
                this.chartContainer.style.boxShadow = this.tag?.darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            const tags = this.tag || {};
            this.updateStyle('--custom-text-color', tags.customFontColor ? tags.fontColor : tags.customWidgetsColor ? tags.widgetsColor : tags.parentCustomFontColor ? tags.parentFontColor : '');
            this.updateStyle('--custom-background-color', tags.customBackgroundColor ? tags.backgroundColor : tags.customWidgetsBackground ? tags.widgetsBackground : tags.parentCustomBackgroundColor ? tags.parentBackgroundColor : '');
        }
        onUpdateBlock() {
            this.renderChart();
            this.updateTheme();
        }
        async updateChartData() {
            this.loadingElm.visible = true;
            if (this._data?.mode === scom_chart_data_source_setup_1.ModeType.SNAPSHOT)
                await this.renderSnapshotData();
            else
                await this.renderLiveData();
            this.loadingElm.visible = false;
        }
        async renderSnapshotData() {
            if (this._data.file?.cid) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.fetchContentByCID)(this._data.file.cid);
                    if (data) {
                        const { metadata, rows } = data;
                        this.chartData = rows;
                        this.columnNames = metadata?.column_names || [];
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch { }
            }
            this.chartData = [];
            this.columnNames = [];
            this.onUpdateBlock();
        }
        async renderLiveData() {
            const dataSource = this._data.dataSource;
            if (dataSource) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.callAPI)({
                        dataSource,
                        queryId: this._data.queryId,
                        apiEndpoint: this._data.apiEndpoint
                    });
                    if (data) {
                        const { metadata, rows } = data;
                        this.chartData = rows;
                        this.columnNames = metadata?.column_names || [];
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch { }
            }
            this.chartData = [];
            this.columnNames = [];
            this.onUpdateBlock();
        }
        renderChart() {
            if ((!this.pnlChart && this._data.options) || !this._data.options)
                return;
            const { title, description, options } = this._data;
            this.lbTitle.caption = title;
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            const { xColumn, yColumns, groupBy, globalSeriesType, seriesOptions, smooth, mergeDuplicateData, stacking, legend, showSymbol, showDataLabels, percentage, xAxis, leftYAxis, rightYAxis, padding = {} } = options;
            const { key, type, timeFormat } = xColumn;
            let _legend = {
                show: legend?.show,
            };
            if (legend && legend.show) {
                if (legend.position) {
                    _legend[legend.position] = 'auto';
                    if (['left', 'right'].includes(legend.position)) {
                        _legend['orient'] = 'vertical';
                    }
                }
                if (legend.scroll) {
                    _legend['type'] = 'scroll';
                }
                if (legend.fontColor) {
                    _legend['textStyle'] = { color: legend.fontColor };
                }
            }
            let yAxisMapping = {};
            let labelFormats = {};
            for (const opt of seriesOptions) {
                yAxisMapping[opt.yAxis] = true;
                labelFormats[opt.title || opt.key] = opt.yAxis === 'left' ? leftYAxis?.labelFormat : rightYAxis?.labelFormat;
            }
            let _yAxis = [];
            Object.keys(yAxisMapping).map(v => {
                const yAxis = v === 'left' ? leftYAxis : rightYAxis;
                _yAxis.push({
                    type: 'value',
                    name: yAxis?.title || '',
                    nameLocation: 'center',
                    nameGap: yAxis?.title ? 40 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        color: yAxis?.fontColor
                    },
                    alignTicks: true,
                    position: v,
                    axisLabel: {
                        // showMinLabel: false,
                        // showMaxLabel: false,
                        fontSize: 10,
                        color: yAxis?.fontColor,
                        position: 'end',
                        formatter: (value, index) => {
                            return (0, index_1.formatNumber)(value, { format: yAxis?.tickFormat, decimals: 2, percentValues: percentage });
                        }
                    },
                    splitNumber: 4
                });
            });
            let _series = [];
            let arr = this.chartData;
            const item = (arr && arr[0]) || {};
            if (groupBy && item[groupBy] !== undefined) {
                const group = (0, index_1.groupByCategory)(arr, groupBy, key, yColumns[0]);
                const times = (0, index_1.extractUniqueTimes)(arr, key);
                let groupData = {};
                const keys = Object.keys(group);
                keys.map(v => {
                    const _data = (0, index_1.concatUnique)(times, group[v]);
                    groupData[v] = (0, index_1.groupArrayByKey)(Object.keys(_data).map(m => [type === 'time' ? (0, components_5.moment)(m, timeFormat).toDate() : m, _data[m]]), mergeDuplicateData);
                });
                const isPercentage = percentage && groupData[keys[0]] && (0, index_1.isNumeric)(groupData[keys[0]][0][1]);
                _series = keys.map(v => {
                    const seriesOpt = seriesOptions?.find(f => f.key === v);
                    let _data = [];
                    if (isPercentage) {
                        _data = groupData[v].map((vals, idx) => {
                            let total = 0;
                            for (const k of keys) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[v];
                    }
                    const isArea = (!seriesOpt?.type && globalSeriesType === 'area') || seriesOpt?.type === 'area';
                    const lineStyle = isArea ? {
                        border: 'transparent',
                        width: 0
                    } : undefined;
                    return {
                        name: seriesOpt?.title || v,
                        type: (0, index_1.getChartType)(seriesOpt?.type || globalSeriesType, 'line'),
                        stack: stacking ? `Total_${seriesOpt.type}_${seriesOpt.yAxis}` : undefined,
                        smooth: smooth,
                        itemStyle: seriesOpt?.color ? { color: seriesOpt.color } : undefined,
                        lineStyle,
                        areaStyle: isArea ? {} : undefined,
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: !!showSymbol,
                        symbolSize: seriesOpt?.type === 'scatter' ? 6 : undefined,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return (0, index_1.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data,
                        z: seriesOpt?.zIndex,
                        yAxisIndex: seriesOpt?.yAxis ? _yAxis.findIndex(f => f.position === seriesOpt.yAxis) : undefined
                    };
                });
            }
            else {
                let groupData = {};
                let isPercentage = percentage && arr.length > 0;
                yColumns.map(col => {
                    if (isPercentage && !(0, index_1.isNumeric)(arr[0][col])) {
                        isPercentage = false;
                    }
                    groupData[col] = (0, index_1.groupArrayByKey)(arr.map(v => [type === 'time' ? (0, components_5.moment)(v[key], timeFormat).toDate() : col, v[col]]), mergeDuplicateData);
                });
                _series = yColumns.map((col) => {
                    let _data = [];
                    const seriesOpt = seriesOptions?.find(f => f.key === col);
                    if (isPercentage) {
                        _data = groupData[col].map((vals, idx) => {
                            let total = 0;
                            for (const k of yColumns) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[col];
                    }
                    const isArea = (!seriesOpt?.type && globalSeriesType === 'area') || seriesOpt?.type === 'area';
                    const lineStyle = isArea ? {
                        border: 'transparent',
                        width: 0
                    } : undefined;
                    return {
                        name: seriesOpt?.title || col,
                        type: (0, index_1.getChartType)(seriesOpt?.type || globalSeriesType, 'line'),
                        stack: stacking ? `Total_${seriesOpt.type}_${seriesOpt.yAxis}` : undefined,
                        smooth: smooth,
                        itemStyle: seriesOpt?.color ? { color: seriesOpt.color } : undefined,
                        lineStyle,
                        areaStyle: isArea ? {} : undefined,
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: !!showSymbol,
                        symbolSize: seriesOpt?.type === 'scatter' ? 6 : undefined,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return (0, index_1.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data,
                        z: seriesOpt?.zIndex,
                        yAxisIndex: seriesOpt?.yAxis ? _yAxis.findIndex(f => f.position === seriesOpt.yAxis) : undefined
                    };
                });
            }
            // let min = 0, max = 0;
            // const isSingle = _series.length === 1;
            // if (isSingle) {
            //   const arr = _series[0].data.filter(v => v[1] !== null).map(v => v[1]);
            //   min = Math.min(...arr);
            //   max = Math.max(...arr);
            //   const step = (max - min) / 5;
            //   min = min > step ? min - step : min;
            //   max += step;
            // }
            // const minInterval = (max - min) / 4;
            // const power = Math.pow(10, Math.floor(Math.log10(minInterval)));
            // const roundedInterval = Math.ceil(minInterval / power) * power;
            const gridPadding = {
                top: padding.top || 60,
                bottom: padding.bottom || 60,
                left: padding.left || '10%',
                right: padding.right || '10%'
            };
            const _chartData = {
                tooltip: {
                    trigger: 'axis',
                    position: function (point, params, dom, rect, size) {
                        var x = point[0];
                        var y = point[1];
                        var viewWidth = document.documentElement.clientWidth;
                        var viewHeight = document.documentElement.clientHeight;
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        // calculate x position of tooltip
                        if (x + boxWidth > viewWidth) {
                            x = x - boxWidth;
                        }
                        // calculate y position of tooltip
                        if (y + boxHeight > viewHeight) {
                            y = y - boxHeight;
                        }
                        if (x < 0)
                            x = 0;
                        if (y < 0)
                            y = 0;
                        return [x, y];
                    },
                    formatter: (params) => {
                        let res = `<b>${xColumn.type === 'time' ? (0, components_5.moment)(params[0].axisValue).format('YYYY-MM-DD HH:mm') : params[0].axisValue}</b>`;
                        if (_series.length === 1) {
                            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? (0, index_1.formatNumber)(params[0].value[1], { percentValues: true }) : (0, index_1.formatNumberByFormat)(params[0].value[1], labelFormats[params[0].seriesName])}</div>`;
                        }
                        else {
                            for (const param of params) {
                                if (param.value[1] !== null) {
                                    res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? (0, index_1.formatNumber)(param.value[1], { percentValues: true }) : (0, index_1.formatNumberByFormat)(param.value[1], labelFormats[param.seriesName])}</div>`;
                                }
                            }
                        }
                        return res;
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            show: false
                        }
                    }
                },
                legend: _legend,
                grid: {
                    containLabel: true,
                    ...gridPadding
                },
                xAxis: {
                    type: type,
                    boundaryGap: false,
                    inverse: xAxis?.reverseValues,
                    name: xAxis?.title || '',
                    nameLocation: 'center',
                    nameGap: xAxis?.title ? 25 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        color: xAxis?.fontColor
                    },
                    axisLabel: {
                        fontSize: 10,
                        hideOverlap: true,
                        color: xAxis?.fontColor,
                        formatter: xAxis?.tickFormat ? (value, index) => {
                            if (type === 'time') {
                                return (0, components_5.moment)(value).format(xAxis.tickFormat);
                            }
                            else {
                                if (isNaN(value))
                                    return value;
                                return (0, index_1.formatNumber)(value, { format: xAxis.tickFormat, decimals: 2 });
                            }
                        } : undefined
                    }
                },
                yAxis: _yAxis.map(v => {
                    return {
                        ...v,
                        // min: isSingle ? min : undefined,
                        // max: isSingle ? max : undefined,
                        // interval: isSingle ? roundedInterval : undefined,
                    };
                }),
                series: _series
            };
            this.pnlChart.clearInnerHTML();
            const chart = new scom_charts_1.ScomCharts(this.pnlChart, {
                data: _chartData,
                width: '100%',
                height: '100%'
            });
            // chart.data = _chartData;
            chart.drawChart();
        }
        resizeChart() {
            if (this.pnlChart) {
                this.pnlChart.firstChild?.resize();
            }
        }
        async init() {
            super.init();
            this.updateTheme();
            this.setTag({
                darkShadow: false,
                height: 500
            });
            this.maxWidth = '100%';
            this.chartContainer.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            this.classList.add(index_css_1.chartStyle);
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    this.setData(data);
                }
            }
            this.executeReadyCallback();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.resizeChart();
                }, 300);
            });
        }
        render() {
            return (this.$render("i-vstack", { id: "chartContainer", position: "relative", height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true }, class: index_css_1.textStyle }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, class: index_css_1.textStyle })),
                this.$render("i-panel", { id: "pnlChart", width: "100%", height: "inherit" })));
        }
    };
    ScomMixedChart = __decorate([
        components_5.customModule,
        (0, components_5.customElements)('i-scom-mixed-chart', {
            icon: 'chart-line',
            className: 'ScomMixedChart',
            props: {
                data: { type: 'object' }
            },
            events: {}
        })
    ], ScomMixedChart);
    exports.default = ScomMixedChart;
});
