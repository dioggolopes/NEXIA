function Sales() {
  return (
    <div className="sales-page">

      <div className="sales-header">

        <div>
          <span className="dashboard-eyebrow">
            NEXIA INTELLIGENCE
          </span>

          <h1>Vendas</h1>

          <p>
            Acompanhe o desempenho comercial do seu negócio.
          </p>
        </div>

        <select className="sales-period" defaultValue="30">
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
          <option value="365">Último ano</option>
        </select>

      </div>


      <section className="sales-metrics">

        <div className="sales-card">
          <span>FATURAMENTO</span>
          <strong>R$ 124.830</strong>
          <small>↑ 18,4%</small>
        </div>

        <div className="sales-card">
          <span>PEDIDOS</span>
          <strong>1.842</strong>
          <small>↑ 12,8%</small>
        </div>

        <div className="sales-card">
          <span>TICKET MÉDIO</span>
          <strong>R$ 67,77</strong>
          <small>↑ 4,9%</small>
        </div>

        <div className="sales-card">
          <span>CONVERSÃO</span>
          <strong>8,42%</strong>
          <small>↑ 1,8%</small>
        </div>

      </section>


      <section className="sales-main-grid">

        <div className="sales-chart-card">

          <div className="sales-card-header">

            <div>
              <span>DESEMPENHO</span>
              <h2>Faturamento</h2>
            </div>

            <span className="sales-growth">
              +18,4%
            </span>

          </div>


          <div className="sales-chart">

            <div className="sales-grid-line line-one"></div>
            <div className="sales-grid-line line-two"></div>
            <div className="sales-grid-line line-three"></div>

            <div className="sales-graph"></div>

            <div className="sales-point point-one"></div>
            <div className="sales-point point-two"></div>
            <div className="sales-point point-three"></div>
            <div className="sales-point point-four"></div>
            <div className="sales-point point-five"></div>
            <div className="sales-point point-six"></div>
            <div className="sales-point point-seven"></div>

            <div className="sales-months">
              <span>01</span>
              <span>05</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>

          </div>

        </div>


        <div className="sales-insight">

          <div className="sales-insight-title">
            ✦ NEXIA INSIGHT
          </div>

          <h2>
            Suas vendas
            <br />
            estão acelerando.
          </h2>

          <p>
            O faturamento cresceu 18,4% em relação
            ao período anterior.
          </p>

          <div className="insight-number">
            +18,4%
          </div>

          <span>
            crescimento identificado
          </span>

        </div>

      </section>


      <section className="sales-bottom-grid">

        <div className="products-card">

          <div className="sales-card-header">

            <div>
              <span>PRODUTOS</span>
              <h2>Mais vendidos</h2>
            </div>

            <button>
              Ver todos →
            </button>

          </div>


          <div className="product-row">

            <div className="product-rank">
              01
            </div>

            <div className="product-info">
              <strong>Produto Premium</strong>
              <span>428 vendas</span>
            </div>

            <b>
              R$ 28.940
            </b>

          </div>


          <div className="product-row">

            <div className="product-rank">
              02
            </div>

            <div className="product-info">
              <strong>Produto Essencial</strong>
              <span>367 vendas</span>
            </div>

            <b>
              R$ 21.480
            </b>

          </div>


          <div className="product-row">

            <div className="product-rank">
              03
            </div>

            <div className="product-info">
              <strong>Produto Pro</strong>
              <span>291 vendas</span>
            </div>

            <b>
              R$ 18.720
            </b>

          </div>


          <div className="product-row">

            <div className="product-rank">
              04
            </div>

            <div className="product-info">
              <strong>Produto Smart</strong>
              <span>246 vendas</span>
            </div>

            <b>
              R$ 14.930
            </b>

          </div>

        </div>


        <div className="sales-goal">

          <span>META DE VENDAS</span>

          <h2>84%</h2>

          <p>
            R$ 124.830 de R$ 148.000
          </p>

          <div className="sales-progress">
            <div></div>
          </div>

          <small>
            Faltam R$ 23.170
          </small>

        </div>

      </section>

    </div>
  )
}

export default Sales