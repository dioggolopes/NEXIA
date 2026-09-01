type Client = {
  name: string
  purchases: number
  revenue: string
  status: 'Ativo' | 'Inativo'
  lastPurchase: string
}

const clients: Client[] = [
  {
    name: 'João Silva',
    purchases: 28,
    revenue: 'R$ 8.420',
    status: 'Ativo',
    lastPurchase: '28/08/2026',
  },
  {
    name: 'Maria Oliveira',
    purchases: 21,
    revenue: 'R$ 6.830',
    status: 'Ativo',
    lastPurchase: '27/08/2026',
  },
  {
    name: 'Carlos Mendes',
    purchases: 14,
    revenue: 'R$ 4.210',
    status: 'Ativo',
    lastPurchase: '25/08/2026',
  },
  {
    name: 'Ana Costa',
    purchases: 8,
    revenue: 'R$ 2.940',
    status: 'Inativo',
    lastPurchase: '12/08/2026',
  },
]

type ClientsProps = {
  onBack: () => void
}

function Clients({ onBack }: ClientsProps) {
  return (
    <div className="clients-page">

      <button
        className="clients-back"
        onClick={onBack}
      >
        ← Voltar ao Dashboard
      </button>

      <div className="clients-header">

        <div>
          <span className="dashboard-eyebrow">
            NEXIA INTELLIGENCE
          </span>

          <h1>Clientes</h1>

          <p>
            Conheça seus clientes e acompanhe o relacionamento com o seu negócio.
          </p>
        </div>

        <button className="new-client-button">
          + Novo cliente
        </button>

      </div>

      <section className="clients-toolbar">

        <div className="clients-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Buscar cliente..."
          />
        </div>

        <select
          className="clients-filter"
          defaultValue="all"
        >
          <option value="all">Todos os clientes</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>

      </section>

      <section className="clients-card">

        <div className="clients-table-header">
          <span>CLIENTE</span>
          <span>COMPRAS</span>
          <span>FATURAMENTO</span>
          <span>ÚLTIMA COMPRA</span>
          <span>STATUS</span>
        </div>

        {clients.map((client) => (
          <div
            className="client-row"
            key={client.name}
          >

            <div className="client-name">

              <div className="client-avatar">
                {client.name.charAt(0)}
              </div>

              <strong>
                {client.name}
              </strong>

            </div>

            <span>
              {client.purchases}
            </span>

            <strong>
              {client.revenue}
            </strong>

            <span className="client-date">
              {client.lastPurchase}
            </span>

            <span
              className={`client-status ${
                client.status === 'Ativo'
                  ? 'active'
                  : 'inactive'
              }`}
            >
              <span className="status-indicator"></span>
              {client.status}
            </span>

          </div>
        ))}

      </section>

      <section className="clients-summary">

        <div>
          <span>TOTAL DE CLIENTES</span>
          <strong>1.248</strong>
        </div>

        <div>
          <span>CLIENTES ATIVOS</span>
          <strong>1.126</strong>
        </div>

        <div>
          <span>NOVOS ESTE MÊS</span>
          <strong>84</strong>
        </div>

        <div>
          <span>RETENÇÃO</span>
          <strong>91,4%</strong>
        </div>

      </section>

    </div>
  )
}

export default Clients