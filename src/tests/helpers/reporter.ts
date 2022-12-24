import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
// import { DisplayProcessor, StacktraceOption } from 'jasmine-spec-reporter';
// var SpecReporter = require('jasmine-spec-reporter').SpecReporter

// type SuiteInfo = jasmine.JasmineStartedInfo;
// import SuiteInfo = jasmine.SuiteInfo;
import SuiteInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);
