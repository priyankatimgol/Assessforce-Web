import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SeperatorDot from '../../../assets/customSVGIcons/SeperatorDot';
import dayjs from 'dayjs';
import WatchIcon from '../../../assets/customSVGIcons/WatchIcon';
import OrgBuildingIcon from '../../../assets/customSVGIcons/OrgBuildingIcon';
import PersonIcon from '../../../assets/customSVGIcons/PersonIcon';

const KpiCards = ({ data, timeZone }) => {
    const formatDateTime = (value) => {
        if (!value) return null;
        const parsedDate = dayjs(value);
        return parsedDate.isValid() ? {
            date: parsedDate.tz(timeZone?.time_zone).format('MM/DD/YYYY'),
            time: parsedDate.tz(timeZone?.time_zone).format('hh:mm A')
        } : null;
    };
    const iconSize = {
        width: '18px',
        height: '18px',
    };

    const KpiIcons = (title) => {
        switch (title) {
            case 'Organization':
                return (
                    <OrgBuildingIcon
                        style={{
                            width: '14px',
                            height: '14px',
                        }}
                    />
                );
            case 'Customer':
            case 'Imported By':
            case 'Created By':
                return <PersonIcon style={iconSize} />;
            case 'Imported On':
            case 'Created On':
                return <WatchIcon style={iconSize} />;
            default:
                return <OrgBuildingIcon style={iconSize} />;
        }
    };

    return (
        <Card
            className="mo-edit-kpi-cards"
            sx={{
                borderRadius: '6px',
                background: 'var(--highlighted-color)',
                boxShadow: 'none',
                // width: { xs: '250px', sm: '250px', md: 'auto' },
                width: { xs: 'auto', sm: 'auto', md: 'auto' },
            }}
        >
            <div style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 0.875rem' }}>
                <div className="items-center">
                    {KpiIcons(data?.title)}
                    <div className="mo-card">
                        <Typography
                            color="var(--muted-text)"
                            fontSize="0.875rem"
                            fontFamily="inter-semibold"
                            marginLeft={1}
                            lineHeight={2}
                        >
                            {data?.title}
                        </Typography>
                    </div>
                </div>
                <Grid container size={{ xs: 12 }} display="flex" alignItems="center" marginTop="0.5rem">
                    <>
                        {data?.label && data?.label?.map((value, index) => (
                            <>
                                <Grid item className="mo-kpi-text-1">
                                    <Typography
                                        color="var(--heading-color)"
                                        fontSize="0.875rem"
                                        fontFamily="inter-regular"
                                        lineHeight="1.25rem"
                                    >
                                        {['Created On', 'Imported On'].includes(data?.title) ? formatDateTime(value)?.date : value}
                                        {/* {index + 1} */}
                                    </Typography>
                                </Grid>

                                <SeperatorDot
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        margin: '0 10px',
                                        display: ['Created On', 'Imported On'].includes(data?.title) ? true : 'none',
                                        color: 'var(--footer-border)',
                                    }}
                                />

                                <Grid item display="flex">
                                    <Typography
                                        color="var(--heading-color)"
                                        fontSize="0.875rem"
                                        fontFamily="inter-regular"
                                        lineHeight="1.25rem"
                                    >
                                        {['Created On', 'Imported On'].includes(data?.title) && formatDateTime(value)?.time}
                                    </Typography>
                                </Grid>

                                <SeperatorDot
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        margin: '0 10px',
                                        display: index !== data.label.length - 1 ? true : 'none',
                                        color: 'var(--footer-border)',
                                    }}
                                />
                            </>
                        ))}
                    </>
                </Grid>
            </div>
        </Card>
    );
};

KpiCards.propTypes = {
    data: PropTypes.object,
    timeZone: PropTypes.string,
};

export default KpiCards;