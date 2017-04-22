//<editor-fold desc="Error">

export var bbzReportError = (error) => {
    return {
        type: 'BBZ_REPORT_ERROR',
        error
    };
};

export var bbzClearError = () => {
    return {
        type: 'BBZ_CLEAR_ERROR'
    };
};




