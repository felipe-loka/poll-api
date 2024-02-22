// import { NodeSDK } from '@opentelemetry/sdk-node'
// import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node'
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
// import {
//   PeriodicExportingMetricReader,
//   ConsoleMetricExporter
// } from '@opentelemetry/sdk-metrics'

// const sdk = new NodeSDK({
//   traceExporter: new ConsoleSpanExporter(),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new ConsoleMetricExporter()
//   }),
//   instrumentations: [getNodeAutoInstrumentations()]
// })

// sdk.start()

import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTEL_COLLECTOR_URL } from './environments'

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: `${OTEL_COLLECTOR_URL}/v1/traces`
  }),
  instrumentations: [getNodeAutoInstrumentations()]
})

sdk.start()
