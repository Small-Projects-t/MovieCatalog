import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#DCDCDC',
        paddingBottom: '1.5rem'
    },

    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '1rem',
        backgroundColor: 'white',
        borderRadius: 7
    },

    headerText: {
        color: '#1976d2',
    },
    header: {
        marginLeft: '1rem',
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
