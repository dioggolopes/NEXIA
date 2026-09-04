import { useEffect, useRef, useState } from 'react'

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

const filterOptions = [
  { value: 'all', label: 'Todos os clientes' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
]

function Clients() {
  const [filter, setFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const filteredClients = clients.filter((client) => {
    if (filter === 'active') return client.status === 'Ativo'
    if (filter === 'inactive') return client.status === 'Inativo'

    return true
  })

  const selectedFilter =
    filterOptions.find((option) => option.value === filter) ??
    filterOptions[0]

  return (
    <div className="clients-page">
      <div className="clients-header">
        <div>
          <span className="dashboard-eyebrow">NEXIA INTELLIGENCE</span>
          <h1>Clientes</h1>
          <p>
            Conheça seus clientes e acompanhe o relacionamento com o seu
            negócio.
          </p>
        </div>

        <button className="new-client-button">+ Novo cliente</button>
      </div>

      <section className="clients-toolbar">
        <div className="clients-search">
          <span>⌕</span>
          <input type="text" placeholder="Buscar cliente..." />
        </div>

        <div className="clients-filter-wrap" ref={filterRef}>
          <button
            type="button"
            className={`clients-filter-button ${
              filterOpen ? 'open' : ''
            }`}
            onClick={() => setFilterOpen((current) => !current)}
            aria-haspopup="listbox"
            aria-expanded={filterOpen}
          >
            <span>{selectedFilter.label}</span>

            <span
              className={`clients-filter-chevron ${
                filterOpen ? 'rotated' : ''
              }`}
            >
              ⌄
            </span>
          </button>

          {filterOpen && (
            <div className="clients-filter-menu" role="listbox">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={filter === option.value}
                  className={`clients-filter-option ${
                    filter === option.value ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setFilter(option.value)
                    setFilterOpen(false)
                  }}
                >
                  <span>{option.label}</span>

                  {filter === option.value && (
                    <span className="clients-filter-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="clients-card">
        <div className="clients-table-header">
          <span>CLIENTE</span>
          <span>COMPRAS</span>
          <span>FATURAMENTO</span>
          <span>ÚLTIMA COMPRA</span>
          <span>STATUS</span>
        </div>

        {filteredClients.map((client) => (
          <div className="client-row" key={client.name}>
            <div className="client-name">
              <div className="client-avatar">
                {client.name.charAt(0)}
              </div>

              <strong>{client.name}</strong>
            </div>

            <span>{client.purchases}</span>

            <strong>{client.revenue}</strong>

            <span className="client-date">
              {client.lastPurchase}
            </span>

            <span
              className={`client-status ${
                client.status === 'Ativo' ? 'active' : 'inactive'
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