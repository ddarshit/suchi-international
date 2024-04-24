import { Close } from '@mui/icons-material'
import { AppBar, Dialog, DialogContent, IconButton, Typography, Box, Toolbar } from '@mui/material'
// import { Button, TextField, Box, IconButton, Typography } from '@mui/material';
import React from 'react'

const MaterialStage = ({ open, handleClose }) => {
    const data = [
        {
            stage: {
                name: "Stage 1"
            },
            products: [
                {
                    id: 1,
                    name: "Pro1",
                    alias: "alias1",
                    category: "c1",
                },
                {
                    id: 2,
                    name: "Pro2",
                    alias: "alias2",
                    category: "c2",
                },
                {
                    id: 3,
                    name: "Pro3",
                    alias: "alias3",
                    category: "c3",
                }
            ]
        },
        {
            stage: {
                name: "Stage 2"
            },
            products: [
                {
                    id: 3,
                    name: "Pro4",
                    alias: "alias4",
                    category: "c1",
                },
                {
                    id: 4,
                    name: "Pro5",
                    alias: "alias5",
                    category: "c2",
                },
                {
                    id: 5,
                    name: "Pro6",
                    alias: "alias6",
                    category: "c3",
                },
                {
                    id: 12,
                    name: "Pro13",
                    alias: "alias13",
                    category: "c1",
                },
                {
                    id: 13,
                    name: "Pro14",
                    alias: "alias14",
                    category: "c2",
                },
                {
                    id: 14,
                    name: "Pro15",
                    alias: "alias15",
                    category: "c3",
                }
            ]
        },
        {
            stage: {
                name: "Stage 3"
            },
            products: [
                {
                    id: 6,
                    name: "Pro7",
                    alias: "alias7",
                    category: "c1",
                },
                {
                    id: 7,
                    name: "Pro8",
                    alias: "alias8",
                    category: "c2",
                },
                {
                    id: 8,
                    name: "Pro9",
                    alias: "alias9",
                    category: "c3",
                }
            ]
        },
        {
            stage: {
                name: "Stage 4"
            },
            products: [
                {
                    id: 9,
                    name: "Pro10",
                    alias: "alias10",
                    category: "c1",
                },
                {
                    id: 10,
                    name: "Pro11",
                    alias: "alias11",
                    category: "c2",
                },
                {
                    id: 11,
                    name: "Pro12",
                    alias: "alias12",
                    category: "c3",
                }
            ]
        }
    ]
    return (
        <Dialog open={open} fullScreen>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
                        Material Name
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="close" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>

                {data.map((item) => {
                    return (
                        <div key={item.id} className='mx-16 mb-6'>
                            <h1 className='font-medium text-3xl underline underline-offset-2 decoration-suchi mb-5'>{item.stage.name}</h1>
                            <div className='flex flex-wrap gap-5'>
                                {item.products.map((p) => {
                                    return (
                                        <div key={p.id} className="w-60 px-6 py-3 bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                            <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900">{p.name}</h5>
                                            <div className="mb-2 text-[17px] font-medium text-gray-800">
                                                Alias: <span className='font-normal'>{p.alias}</span>
                                            </div>
                                            <div className="mb-2 text-[17px] font-medium text-gray-800">
                                                Category: <span className='font-normal'>{p.category}</span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <span className='bg-red-500 px-2 py-1 rounded-full text-sm text-white'>Not completed</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

            </DialogContent>
        </Dialog>
    )
}

export default MaterialStage