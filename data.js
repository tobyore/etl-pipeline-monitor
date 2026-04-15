var DUMMY_INCIDENTS = [
  { id:"ETL-2001", alert:"ADF pipeline 'member_profiles_sync' failed — source timeout", severity:"Critical", category:"Source Connectivity", team:"Data Eng", status:"Resolved", mttr:"11m" },
  { id:"ETL-2002", alert:"Schema drift detected in billing_transactions sink", severity:"High", category:"Schema Drift", team:"Data Governance", status:"Resolved", mttr:"26m" },
  { id:"ETL-2003", alert:"SLA breach: check_in_data pipeline >45min runtime", severity:"High", category:"Performance", team:"Data Eng", status:"Investigating", mttr:"-" },
  { id:"ETL-2004", alert:"Azure SQL DTU usage >95% during member_360 load", severity:"Critical", category:"Infrastructure", team:"Platform Eng", status:"Resolved", mttr:"9m" },
  { id:"ETL-2005", alert:"Salesforce Bulk API rate limit hit on Member 360 write", severity:"Medium", category:"Integration", team:"CRM Eng", status:"Resolved", mttr:"7m" },
  { id:"ETL-2006", alert:"Data quality: 2,300 null member_ids in staging table", severity:"High", category:"Data Quality", team:"Data Governance", status:"Open", mttr:"-" },
  { id:"ETL-2007", alert:"Blob Storage SAS token expired for fitness_metrics export", severity:"Medium", category:"Security", team:"Platform Eng", status:"Resolved", mttr:"14m" },
  { id:"ETL-2008", alert:"Mapping data flow OOM on class_schedule_transform", severity:"High", category:"Performance", team:"Data Eng", status:"Resolved", mttr:"33m" }
];

var SIMULATION_ALERTS = [
  "ADF pipeline 'payment_reconciliation' failed — Cosmos DB throughput exceeded",
  "Schema mismatch: new column 'promo_code' in member_signups source",
  "SLA breach: club_inventory_sync pipeline runtime >60min",
  "Azure Synapse pool paused during peak member_analytics query",
  "Data Factory IR self-hosted node offline — on-prem gym data stalled"
];

var SIMULATION_CATEGORIES = ["Infrastructure","Schema Drift","Performance","Infrastructure","Connectivity"];
var SIMULATION_TEAMS = ["Platform Eng","Data Governance","Data Eng","Platform Eng","Data Eng"];
var SIMULATION_SEVERITIES = ["Critical","High","High","Medium","Critical"];
