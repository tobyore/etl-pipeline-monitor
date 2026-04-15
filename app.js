var incidentCounter = 2008;
var simIndex = 0;

function renderDashboard() {
  var body = document.getElementById("incidentBody");
  body.innerHTML = "";
  DUMMY_INCIDENTS.forEach(function(inc) {
    var sevClass = "sev-" + inc.severity.toLowerCase();
    var statClass = "status-" + inc.status.toLowerCase();
    var row = document.createElement("tr");
    row.innerHTML = "<td>" + inc.id + "</td><td>" + inc.alert + "</td><td class='" + sevClass + "'>" + inc.severity + "</td><td>" + inc.category + "</td><td>" + inc.team + "</td><td class='" + statClass + "'>" + inc.status + "</td><td>" + inc.mttr + "</td>";
    body.appendChild(row);
  });
  updateMetrics();
}

function updateMetrics() {
  var total = DUMMY_INCIDENTS.length;
  var resolved = DUMMY_INCIDENTS.filter(function(i) { return i.status === "Resolved"; });
  var mttrVals = resolved.map(function(i) { return parseInt(i.mttr) || 0; }).filter(function(v) { return v > 0; });
  var avgMttr = mttrVals.length > 0 ? Math.round(mttrVals.reduce(function(a,b) { return a+b; }, 0) / mttrVals.length) : 0;

  document.getElementById("metricTotal").textContent = total;
  document.getElementById("metricMTTR").textContent = avgMttr + "m";
  document.getElementById("metricAI").textContent = "91%";
  document.getElementById("metricDeflect").textContent = Math.round((resolved.length / total) * 100) + "%";
}

function triggerIncident() {
  var btn = document.getElementById("triggerBtn");
  var timeline = document.getElementById("timeline");
  btn.disabled = true;
  timeline.innerHTML = "";

  var idx = simIndex % SIMULATION_ALERTS.length;
  var alertText = SIMULATION_ALERTS[idx];
  var category = SIMULATION_CATEGORIES[idx];
  var team = SIMULATION_TEAMS[idx];
  var severity = SIMULATION_SEVERITIES[idx];
  incidentCounter++;
  var incId = "ETL-" + incidentCounter;
  simIndex++;

  var steps = [
    { delay: 0, text: "⚙️ Azure Monitor alert received: \"" + alertText + "\"" },
    { delay: 800, text: "🔍 Dedup check — Azure Table Storage lookup, no matching pipeline fingerprint in 20 min. Proceeding." },
    { delay: 1600, text: "🤖 Azure OpenAI Classification → Severity: " + severity + " | Root Cause: " + category + " | Confidence: 89%" },
    { delay: 2400, text: "📋 Auto-routed to " + team + " (on-call: @engineer)" },
    { delay: 3200, text: "💬 Teams notification sent to #etl-incidents-" + severity.toLowerCase() },
    { delay: 4000, text: "🎫 Jira ticket " + incId + " created (async via Service Bus)" },
    { delay: 4800, text: "📊 Slack #etl-pipeline updated with incident context and status thread" },
    { delay: 5600, text: "✅ Incident " + incId + " triaged in 5.6s — awaiting resolution" }
  ];

  steps.forEach(function(step, i) {
    setTimeout(function() {
      var div = document.createElement("div");
      div.className = "tl-item" + (i === steps.length - 1 ? " done" : "");
      div.innerHTML = "<div class='tl-time'>" + new Date().toLocaleTimeString() + "</div><div class='tl-text'>" + step.text + "</div>";
      timeline.appendChild(div);
      div.scrollIntoView({ behavior: "smooth", block: "nearest" });

      if (i === steps.length - 1) {
        DUMMY_INCIDENTS.unshift({
          id: incId, alert: alertText, severity: severity,
          category: category, team: team, status: "Investigating", mttr: "-"
        });
        renderDashboard();
        btn.disabled = false;
      }
    }, step.delay);
  });
}

renderDashboard();
