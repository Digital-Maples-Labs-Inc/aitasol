import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`company-tabpanel-${index}`}
            aria-labelledby={`company-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Fade in timeout={500}>
                    <Box sx={{ p: 4 }}>
                        {children}
                    </Box>
                </Fade>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `company-tab-${index}`,
        'aria-controls': `company-tabpanel-${index}`,
    };
}

interface CompanyValuesTabsProps {
    whoWeAreContent: React.ReactNode;
    philosophyContent: React.ReactNode;
    howWeWorkContent: React.ReactNode;
    commitmentContent: React.ReactNode;
    missionContent: React.ReactNode;
}

export default function CompanyValuesTabs({
    whoWeAreContent,
    philosophyContent,
    howWeWorkContent,
    commitmentContent,
    missionContent
}: CompanyValuesTabsProps) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, display: 'flex', justifyContent: 'center' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="company values tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'primary.main',
                        },
                        '& .MuiTab-root': {
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', md: '1.1rem' },
                            textTransform: 'none',
                            mx: 1,
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        }
                    }}
                >
                    <Tab label="Who We Are" {...a11yProps(0)} />
                    <Tab label="Our Philosophy" {...a11yProps(1)} />
                    <Tab label="How We Work" {...a11yProps(2)} />
                    <Tab label="Our Commitment" {...a11yProps(3)} />
                    <Tab label="Mission" {...a11yProps(4)} />
                </Tabs>
            </Box>

            <Paper
                variant="outlined"
                sx={{
                    minHeight: 300,
                    display: 'flex',
                    alignItems: 'flex-start',
                    borderRadius: 0,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                <TabPanel value={value} index={0}>
                    {whoWeAreContent}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {philosophyContent}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {howWeWorkContent}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {commitmentContent}
                </TabPanel>
                <TabPanel value={value} index={4}>
                    {missionContent}
                </TabPanel>
            </Paper>
        </Box>
    );
}
