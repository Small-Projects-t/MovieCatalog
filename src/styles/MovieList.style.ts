import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#DCDCDC',
        paddingBottom: '1.5rem'
    },

    tableContainer: {
        borderRadius: 7,
        marginLeft: '1rem',
        backgroundColor: 'white',

    },
    table: {
        marginTop:'2rem',
        marginBottom:'2rem',
        marginLeft: '1rem',
    },
    headerContainer: {
        borderRadius: 7,
    },

    headerText: {
        color: '#1976d2',
        backgroundColor: '#DCDCDC',
        width: '100%'
    },


    nameSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: '1rem',
    },

    inputsSections: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: '1rem',
        marginTop:'1rem',
    },

    btnSections: {
        marginTop:'1rem',

        marginBottom:'2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    saveBtn: {

    },
    closeBtn: {
        marginLeft:'0.4rem',
    }
});
