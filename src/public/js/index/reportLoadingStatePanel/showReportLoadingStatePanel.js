var panel = `<div id="report-loading-state-panel">
      <h5>Статус загрузки:</h1>
        <div id="report-loading-state-progress-info"></div>
        <div id="report-loading-state-progress-details">
          <details id="report-loading-state-details">
            <summary>детали</summary>
             <details id="loaded-reports">
              <summary>загруженные</summary>
            </details>
            <details id="reports-queue">
              <summary>в очереди</summary>
            </details>
            <details id="loaded-reports">
              <summary>не удалось загрузить</summary>
            </details>
          </details>
        </div>
        <div id="loader-container">
          <span class="report-loading-state-loader"></span>
        </div>
      </div>`;

var reportLoadingStatePanelContainer = document.getElementById("report-loading-state-panel");

var showReportLoadingStatePanel = () => (reportLoadingStatePanelContainer.innerHTML = panel);

export default showReportLoadingStatePanel;
