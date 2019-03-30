export const homepagestyles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        'margin-top': '-5rem'
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },

    footer: {

        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
        // margin: '0,0,0,0',
        // marginTop: '8em',
        position: 'absolute',
        width: '100%',
        clear: 'both',
        bottom: 0



    },
});