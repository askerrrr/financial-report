var panel = `
      <h5>Загружено:</h5>
      <h5>Статус загрузки:</h5>
        <div id="report-loading-state-progress-info"></div>
        <div id="report-loading-state-progress-details">
          <details id="report-loading-state-details">
            <summary>детали</summary>
             <details id="reports-queue">
              <summary>загруженные</summary>
              <table>
                    <thead>
                        <tr>
                        <th>период отчета</th>
                        <th>попыток загрузить</th>
                        </tr>
                    </thead>
                    <tbody id="reports-queue-tbody">
                    </tbody>
              </table>
            </details>
            <details id="abandoned-reports">
              <summary>не удалось загрузить</summary>
              <table>
                    <thead>
                        <tr>
                        <th>период отчета</th>
                        <th>попыток загрузить</th>
                        </tr>
                    </thead>
                    <tbody id="abandoned-reports-tbody">
                    </tbody>
              </table>              
            </details>
          </details>
        </div>
        <div id="loader-container">
          <span class="report-loading-state-loader"></span>
        </div>`;

var reportLoadingStatePanelContainer = document.getElementById("report-loading-state-panel");

var showReportLoadingStatePanel = async () => (reportLoadingStatePanelContainer.innerHTML = panel);

export default showReportLoadingStatePanel;
