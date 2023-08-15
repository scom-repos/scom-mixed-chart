const visualizationOptions = {
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
                    required: true
                },
                type: {
                    type: 'string',
                    enum: ['time', 'category'],
                    required: true
                }
            }
        },
        yColumns: {
            type: 'array',
            title: 'Y columns',
            required: true,
            items: {
                type: 'string'
            }
        },
        groupBy: {
            type: 'string'
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

export function getBuilderSchema() {
    return {
        general: {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            },
            uiSchema: {
                type: 'VerticalLayout',
                elements: [
                    // {
                    //   type: 'Control',
                    //   scope: '#/properties/apiEndpoint',
                    //   title: 'API Endpoint'
                    // },
                    {
                        type: 'Control',
                        scope: '#/properties/title'
                    },
                    {
                        type: 'Control',
                        scope: '#/properties/description'
                    },
                    {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/xColumn',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/yColumns',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/groupBy',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/globalSeriesType',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/smooth',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/stacking',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/legend',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/showSymbol',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/showDataLabels',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/percentage',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/xAxis',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/leftYAxis',
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options/properties/rightYAxis',
                            },
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
        },
        advanced: {
            dataSchema: {
                type: 'object',
                properties: {
                    options: visualizationOptions
                }
            },
            uiSchema: {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/xColumn'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/yColumns'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/groupBy'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/globalSeriesType'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/smooth'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/stacking'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/legend'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/showSymbol'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/showDataLabels'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/percentage'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/xAxis'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/leftYAxis'
                          }
                        ]
                    },
                    {
                        type: "HorizontalLayout",
                        elements: [
                          {
                            type: 'Control',
                            scope: '#/properties/options/properties/rightYAxis'
                          }
                        ]
                    },  
                    {
                        type: "HorizontalLayout",
                        elements: [
                            {
                                type: "Control",
                                scope: '#/properties/options/properties/seriesOptions',
                                options: {
                                    detail: {
                                        type: "VerticalLayout"
                                    }
                                }
                            }
                        ]
                    }                   
                ]
            }
        },
        theme: {
            dataSchema: {
                type: 'object',
                properties: {
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
                    //   type: 'string'
                    // },
                    height: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

export function getEmbedderSchema() {
    return {
        general: {
            dataSchema: {
                type: 'object',
                properties: {
                    // apiEndpoint: {
                    //     type: 'string',
                    //     title: 'API Endpoint',
                    //     required: true
                    // },
                    title: {
                        type: 'string',
                        required: true
                    },
                    description: {
                        type: 'string'
                    },
                    options: visualizationOptions
                }
            }
        },
        theme: {
            dataSchema: {
                type: 'object',
                properties: {
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
                    //   type: 'string'
                    // },
                    height: {
                        type: 'string'
                    }
                }
            }
        }
    }
}