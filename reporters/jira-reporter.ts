import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

interface TestRecord {
  title: string;
  status: string;
  duration: number;
  error?: string;
}

class JiraReporter implements Reporter {
  private enabled = false;
  private jiraTicket = '';
  private jiraBaseUrl = '';
  private jiraEmail = '';
  private jiraApiToken = '';
  private results: TestRecord[] = [];

  onBegin(config: FullConfig, suite: Suite): void {
    const ticket = process.env.JIRA_TICKET;
    const baseUrl = process.env.JIRA_BASE_URL;
    const email = process.env.JIRA_EMAIL;
    const token = process.env.JIRA_API_TOKEN;

    if (!ticket || !baseUrl || !email || !token) {
      console.log('[JiraReporter] Skipping: one or more JIRA env vars are missing (JIRA_TICKET, JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN)');
      return;
    }

    this.enabled = true;
    this.jiraTicket = ticket;
    this.jiraBaseUrl = baseUrl.replace(/\/+$/, '');
    this.jiraEmail = email;
    this.jiraApiToken = token;
    console.log(`[JiraReporter] Will post results to ${this.jiraTicket}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (!this.enabled) return;

    const record: TestRecord = {
      title: test.title,
      status: result.status,
      duration: result.duration,
    };

    if (result.status === 'failed' || result.status === 'timedOut') {
      const errorMessage = result.errors
        .map((e) => e.message || e.toString())
        .join('\n');
      if (errorMessage) {
        record.error = errorMessage;
      }
    }

    this.results.push(record);
  }

  async onEnd(result: FullResult): Promise<void> {
    if (!this.enabled) return;

    const passed = this.results.filter((r) => r.status === 'passed').length;
    const failed = this.results.filter((r) => r.status === 'failed' || r.status === 'timedOut').length;
    const skipped = this.results.filter((r) => r.status === 'skipped').length;
    const total = this.results.length;

    const failedTests = this.results.filter(
      (r) => r.status === 'failed' || r.status === 'timedOut'
    );

    const statusIcon = failed > 0 ? '(x)' : '(/)';
    const overallStatus = result.status === 'passed' ? 'PASSED' : 'FAILED';
    const environment = process.env.TEST_ENV || 'me-63384';

    let comment = `h2. ${statusIcon} Playwright Test Results — ${overallStatus}\n\n`;
    comment += `||Metric||Value||\n`;
    comment += `|Environment|${environment}.dev.marginedge.com|\n`;
    comment += `|Total Tests|${total}|\n`;
    comment += `|Passed (/) |${passed}|\n`;
    comment += `|Failed (x) |${failed}|\n`;
    comment += `|Skipped|${skipped}|\n`;
    comment += `|Overall|${overallStatus}|\n`;
    comment += `|Date|${new Date().toISOString()}|\n`;

    comment += `\nh2. All Test Cases\n\n`;
    comment += `||#||Test||Status||Duration||\n`;
    for (let i = 0; i < this.results.length; i++) {
      const t = this.results[i];
      const durationSec = (t.duration / 1000).toFixed(1);
      const icon = t.status === 'passed' ? '(/)' : t.status === 'skipped' ? '(!)' : '(x)';
      comment += `|${i + 1}|${t.title}|${icon} ${t.status}|${durationSec}s|\n`;
    }

    if (failedTests.length > 0) {
      comment += `\nh2. (x) Failed Test Details\n\n`;
      comment += `||Test||Error||\n`;
      for (const t of failedTests) {
        const errorText = t.error
          ? t.error.substring(0, 300).replace(/[|]/g, '\\|').replace(/\n/g, ' ')
          : 'No error message';
        comment += `|${t.title}|${errorText}|\n`;
      }
    }

    const url = `${this.jiraBaseUrl}/rest/api/2/issue/${this.jiraTicket}/comment`;
    const auth = Buffer.from(`${this.jiraEmail}:${this.jiraApiToken}`).toString('base64');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ body: comment }),
      });

      if (!response.ok) {
        const body = await response.text();
        console.error(`[JiraReporter] Failed to post comment (${response.status}): ${body}`);
      } else {
        console.log(`[JiraReporter] Successfully posted results to ${this.jiraTicket}`);
      }
    } catch (err) {
      console.error(`[JiraReporter] Error posting to Jira:`, err);
    }
  }

  printsToStdio(): boolean {
    return false;
  }
}

export default JiraReporter;
