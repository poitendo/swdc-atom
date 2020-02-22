'use babel';

const fileDataMgr = require('../storage/FileDataManager');
const utilMgr = require('../UtilManager');

const statusMgr = {};

let showStatusBarText = true;

/**
 * Update the status bar text
 **/
statusMgr.updateStatus = () => {
    const data = fileDataMgr.getSessionSummaryData();

    const currentDayMinStr = utilMgr.humanizeMinutes(data.currentDayMinutes);
    let icon =
        data.currentDayMinutes > data.averageDailyMinutes ? 'rocket' : '';

    let msg = currentDayMinStr;

    if (!showStatusBarText) {
        msg = '';
        icon = 'clock';
    }
    utilMgr.getStatusView().display(msg, icon, utilMgr.getItem('name'));
};

statusMgr.toggleStatusBarMetrics = () => {
    showStatusBarText = !showStatusBarText;
    statusMgr.updateStatus();
    atom.commands.dispatch(
        atom.views.getView(atom.workspace),
        'Code-Time:refresh-code-time-metrics'
    );
};

statusMgr.showingStatusBarText = () => {
    return showStatusBarText;
};

module.exports = statusMgr;