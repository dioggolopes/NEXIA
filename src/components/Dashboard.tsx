type DashboardProps = {
  onAskAI: (context: {
    metric: string
    value: string
    variation: string
    question: string
  }) => void
}

function Dashboard({ onAskAI }: DashboardProps) {
  return (
    <div className="dashboard-content">

      <header className="dashboard-top">

        <div>
          <span className="dashboard-eyebrow">
            NEXIA INTELLIGENCE
          </span>

          <h1>
            Visão geral
          </h1>

          <p>
            Tudo o que importa para o seu negócio, em um só lugar.
          </p>
        </div>

        <div className="dashboard-user">

          <div className="online-dot"></div>

          <span>
            Sistema online
          </span>

        </div>

      </header>


      <section className="dashboard-metrics">

        <div className="dashboard-card">
          <span>RECEITA</span>

          <strong>
            R$ 124.830
          </strong>

          <small className="positive">
            ↑ 18,4%
          </small>

          <p>
            comparado ao mês anterior
          </p>
        </div>


        <div className="dashboard-card">
          <span>VENDAS</span>

          <strong>
            1.842
          </strong>

          <small className="positive">
            ↑ 12,8%
          </small>

          <p>
            pedidos realizados
          </p>
        </div>


        <div className="dashboard-card">
          <span>CLIENTES</span>

          <strong>
            1.284
          </strong>

          <small className="positive">
            ↑ 7,2%
          </small>

          <p>
            clientes ativos
          </p>
        </div>


        <div className="dashboard-card">
          <span>MARGEM</span>

          <strong>
            31,8%
          </strong>

          <small className="positive">
            ↑ 2,4%
          </small>

          <p>
            margem média
          </p>
        </div>

      </section>


      <section className="dashboard-grid">

        <div className="performance-card">

          <div className="card-header">

            <div>
              <span>
                PERFORMANCE
              </span>

              <h2>
                Receita
              </h2>
            </div>

            <select defaultValue="6">

              <option value="6">
                Últimos 6 meses
              </option>

              <option value="12">
                Últimos 12 meses
              </option>

            </select>

          </div>


          <div className="chart">

            <div className="chart-line"></div>

            <div className="chart-point point-1"></div>
            <div className="chart-point point-2"></div>
            <div className="chart-point point-3"></div>
            <div className="chart-point point-4"></div>
            <div className="chart-point point-5"></div>
            <div className="chart-point point-6"></div>

            <div className="chart-labels">

              <span>MAR</span>
              <span>ABR</span>
              <span>MAI</span>
              <span>JUN</span>
              <span>JUL</span>
              <span>AGO</span>

            </div>

          </div>

        </div>


        <div className="intelligence-panel">

          <div className="intelligence-title">

            <span>✦</span>

            NEXIA INTELLIGENCE

          </div>

          <h2>

            Encontrei
            <br />

            <strong>
              7 oportunidades.
            </strong>

          </h2>

          <p>
            Analisei seus dados e encontrei padrões
            que podem gerar crescimento.
          </p>

          <button
  className="intelligence-button"
  onClick={() =>
    onAskAI({
      metric: 'Oportunidades de crescimento',
      value: '7 oportunidades',
      variation: 'Análise estratégica',
      question:
        'Analise as 7 oportunidades encontradas no meu negócio, explique quais são as mais importantes, o impacto potencial de cada uma e quais ações devo priorizar primeiro.',
    })
  }
>
  Ver oportunidades
  <span>→</span>
</button>

        </div>

      </section>


      <section className="bottom-grid">

        <div className="activity-card">

          <div className="card-header">

            <div>

              <span>
                ATIVIDADE
              </span>

              <h2>
                Últimas movimentações
              </h2>

            </div>

          </div>


          <div className="activity">

            <div className="activity-icon">
              $
            </div>

            <div>

              <strong>
                Nova venda registrada
              </strong>

              <p>
                Pedido #10482
              </p>

            </div>

            <b>
              + R$ 1.240
            </b>

          </div>


          <div className="activity">

            <div className="activity-icon">
              +
            </div>

            <div>

              <strong>
                Novo cliente
              </strong>

              <p>
                João da Silva
              </p>

            </div>

            <b>
              Agora
            </b>

          </div>


          <div className="activity">

            <div className="activity-icon">
              ↑
            </div>

            <div>

              <strong>
                Meta mensal atualizada
              </strong>

              <p>
                84% da meta alcançada
              </p>

            </div>

            <b>
              Hoje
            </b>

          </div>

        </div>


        <div className="goal-card">

          <span>
            META MENSAL
          </span>

          <h2>
            84%
          </h2>

          <p>
            R$ 124.830 de R$ 148.000
          </p>

          <div className="progress">

            <div className="progress-value"></div>

          </div>

          <small>
            Faltam R$ 23.170 para atingir a meta.
          </small>

        </div>

      </section>

    </div>
  )
}

export default Dashboard