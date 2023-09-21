function visualizationOptions(columns: string[]) {
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
    }
}

const theme = {
    darkShadow: {
        type: 'boolean'
    },
    fontColor: {
        type: 'string',
        format: 'color'
    },
    backgroundColor: {
        type: 'string',
        format: 'color'
    },
    // width: {
    //     type: 'string'
    // },
    height: {
        type: 'string'
    }
}


const themeUISchema = {
    type: 'Category',
    label: 'Theme',
    elements: [
        {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/darkShadow'
                },
                {
                    type: 'Control',
                    scope: '#/properties/fontColor'
                },
                {
                    type: 'Control',
                    scope: '#/properties/backgroundColor'
                },
                {
                    type: 'Control',
                    scope: '#/properties/height'
                }
            ]
        }
    ]
}

export function getBuilderSchema(columns: string[]) {
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
    }
}


export function getEmbedderSchema(columns: string[]) {
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
    }
}