export type AIContext = {
  metric: string
  value: string
  variation: string
  question: string
}

type InsightsProps = {
  onAskAI: (context: AIContext) => void
}

type InsightMetric = Omit<AIContext, 'question'> & { detail: string; tone?: 'positive' | 'warning' }
type Analysis = { title: string; subtitle: string; value: string; variation: string; visual: 'chart' | 'bars' | 'rings' | 'wave' }

const metrics: InsightMetric[] = [
  { metric: 'Faturamento', value: 'R$ 124.830', variation: '+18,4%', detail: 'vs. mês anterior' },
  { metric: 'Crescimento de vendas', value: '18,4%', variation: '+4,2 p.p.', detail: 'ritmo de expansão' },
  { metric: 'Ticket médio', value: 'R$ 67,77', variation: '+4,9%', detail: 'por pedido' },
  { metric: 'Quantidade de pedidos', value: '1.842', variation: '+12,8%', detail: 'no período' },
  { metric: 'Clientes ativos', value: '1.284', variation: '+7,2%', detail: 'base recorrente' },
  { metric: 'Clientes em risco', value: '38', variation: '-14,6%', detail: 'sem compra há 60 dias', tone: 'positive' },
  { metric: 'Taxa de recompra', value: '42,6%', variation: '+5,1 p.p.', detail: 'nos últimos 90 dias' },
  { metric: 'Churn', value: '3,8%', variation: '-0,9 p.p.', detail: 'clientes perdidos', tone: 'positive' },
  { metric: 'Margem', value: '31,8%', variation: '+2,4 p.p.', detail: 'eficiência operacional' },
  { metric: 'Produtos em alta', value: '4', variation: '+2 produtos', detail: 'com demanda crescente' },
  { metric: 'Produtos em queda', value: '2', variation: '-1 produto', detail: 'exigem atenção', tone: 'positive' },
  { metric: 'Meta x realizado', value: '94,6%', variation: '+8,4 p.p.', detail: 'da meta mensal' },
]

const analyses: Analysis[] = [
  { title: 'Evolução do faturamento', subtitle: 'Últimos seis meses', value: 'R$ 124,8k', variation: '+18,4%', visual: 'chart' },
  { title: 'Análise de lucro', subtitle: 'Margem e resultado', value: '31,8%', variation: '+2,4 p.p.', visual: 'rings' },
  { title: 'Fluxo de caixa', subtitle: 'Entradas e saídas previstas', value: 'R$ 48,2k', variation: '+12,9%', visual: 'wave' },
  { title: 'Produtos mais vendidos', subtitle: 'Receita por linha', value: 'Produto Premium', variation: '428 vendas', visual: 'bars' },
  { title: 'Performance de clientes', subtitle: 'Valor e recorrência', value: '91,4%', variation: '+3,6 p.p.', visual: 'rings' },
  { title: 'Sazonalidade', subtitle: 'Tendência dos próximos 90 dias', value: 'Alta prevista', variation: 'Setembro', visual: 'wave' },
  { title: 'Performance por região', subtitle: 'Melhor desempenho', value: 'Sudeste', variation: '46,2% da receita', visual: 'bars' },
  { title: 'Performance por segmento', subtitle: 'Maior oportunidade', value: 'Enterprise', variation: '+24,6%', visual: 'chart' },
]

function createQuestion(metric: string) {
  return `Analise ${metric.toLowerCase()} e explique os principais fatores desta performance.`
}

function AskAIButton({ context, onAskAI }: { context: AIContext; onAskAI: (context: AIContext) => void }) {
  return <button className="ask-ai-button" onClick={() => onAskAI(context)}><span>✦</span> Perguntar à IA</button>
}

function Insights({ onAskAI }: InsightsProps) {
  return (
    <div className="insights-page">
      <header className="insights-header">
        <div>
          <span className="dashboard-eyebrow">NEXIA INTELLIGENCE</span>
          <h1>Insights</h1>
          <p>Uma leitura clara da performance para decisões ainda melhores.</p>
        </div>
        <div className="insights-period"><span className="online-dot" /> Dados atualizados agora <button>Últimos 30 dias⌄</button></div>
      </header>

      <section className="insights-hero glass-panel">
        <div>
          <span className="insights-kicker">✦ LEITURA DA NEXIA IA</span>
          <h2>Seu negócio está em um <strong>ciclo de crescimento saudável.</strong></h2>
          <p>Receita, retenção e margem evoluíram juntas. A maior oportunidade está em ampliar o mix de clientes Enterprise.</p>
        </div>
        <AskAIButton onAskAI={onAskAI} context={{ metric: 'Visão geral do negócio', value: 'Crescimento saudável', variation: '+18,4%', question: 'Faça uma leitura executiva da saúde do meu negócio e priorize as oportunidades.' }} />
      </section>

      <section className="insights-section-heading"><div><span>INDICADORES</span><h2>O pulso do seu negócio</h2></div><p>Dados mockados, prontos para conexão com sua fonte real.</p></section>
      <section className="insights-metrics">
        {metrics.map((item) => {
          const context: AIContext = { ...item, question: createQuestion(item.metric) }
          return <article className="insight-metric glass-panel" key={item.metric}>
            <div className="metric-top"><span>{item.metric.toUpperCase()}</span><i className={item.tone === 'warning' ? 'metric-icon warning' : 'metric-icon'}>↗</i></div>
            <strong>{item.value}</strong>
            <div className="metric-change"><b className={item.tone === 'warning' ? 'positive' : 'positive'}>{item.variation}</b><span>{item.detail}</span></div>
            <AskAIButton context={context} onAskAI={onAskAI} />
          </article>
        })}
      </section>

      <section className="insights-section-heading analysis-heading"><div><span>ANÁLISES</span><h2>Onde olhar em seguida</h2></div></section>
      <section className="analysis-grid">
        {analyses.map((analysis) => {
          const context: AIContext = { metric: analysis.title, value: analysis.value, variation: analysis.variation, question: `Analise ${analysis.title.toLowerCase()} e indique os próximos passos mais relevantes.` }
          return <article className="analysis-card glass-panel" key={analysis.title}>
            <div className={`analysis-visual ${analysis.visual}`}><span /><span /><span /><span /><span /></div>
            <div className="analysis-content"><span>{analysis.subtitle.toUpperCase()}</span><h3>{analysis.title}</h3><strong>{analysis.value}</strong><b>{analysis.variation}</b></div>
            <AskAIButton context={context} onAskAI={onAskAI} />
          </article>
        })}
      </section>
    </div>
  )
}

export default Insights