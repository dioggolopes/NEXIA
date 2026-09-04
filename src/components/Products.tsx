import { useEffect, useMemo, useRef, useState } from 'react'

type ProductStatus = 'Ativo' | 'Baixo estoque' | 'Sem estoque'

type Product = {
  id: number
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  minStock: number
  sales: number
  status: ProductStatus
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Notebook Pro 15"',
    sku: 'NTB-001',
    category: 'Eletrônicos',
    price: 4899.9,
    cost: 3250,
    stock: 18,
    minStock: 8,
    sales: 42,
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Monitor UltraWide 34"',
    sku: 'MON-034',
    category: 'Eletrônicos',
    price: 2299.9,
    cost: 1540,
    stock: 6,
    minStock: 10,
    sales: 31,
    status: 'Baixo estoque',
  },
  {
    id: 3,
    name: 'Teclado Mecânico RGB',
    sku: 'TEC-120',
    category: 'Periféricos',
    price: 449.9,
    cost: 210,
    stock: 34,
    minStock: 12,
    sales: 76,
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Mouse Precision',
    sku: 'MOU-220',
    category: 'Periféricos',
    price: 289.9,
    cost: 138,
    stock: 4,
    minStock: 8,
    sales: 58,
    status: 'Baixo estoque',
  },
  {
    id: 5,
    name: 'Headset Pro Wireless',
    sku: 'HST-500',
    category: 'Áudio',
    price: 699.9,
    cost: 390,
    stock: 0,
    minStock: 6,
    sales: 24,
    status: 'Sem estoque',
  },
  {
    id: 6,
    name: 'Webcam Full HD',
    sku: 'CAM-108',
    category: 'Acessórios',
    price: 379.9,
    cost: 185,
    stock: 21,
    minStock: 8,
    sales: 39,
    status: 'Ativo',
  },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

  type NexiaDropdownOption = {
  value: string
  label: string
}

type NexiaDropdownProps = {
  value: string
  options: NexiaDropdownOption[]
  onChange: (value: string) => void
  className?: string
}

function NexiaDropdown({
  value,
  options,
  onChange,
  className = '',
}: NexiaDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const selected = options.find((option) => option.value === value)

  return (
    <div
      ref={ref}
      className={`nexia-dropdown ${open ? 'open' : ''} ${className}`}
    >
      <button
        type="button"
        className="nexia-dropdown-button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected?.label ?? value}</span>
        <i>⌃</i>
      </button>

      {open && (
        <div className="nexia-dropdown-menu" role="listbox">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`nexia-dropdown-option ${
                option.value === value ? 'selected' : ''
              }`}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              role="option"
              aria-selected={option.value === value}
            >
              <span>{option.label}</span>

              {option.value === value && <strong>✓</strong>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [status, setStatus] = useState('Todos')
  
  const [newProduct, setNewProduct] = useState({
  name: '',
  sku: '',
  category: '',
  price: '',
  cost: '',
  stock: '',
  minStock: '5',
})

const [showForm, setShowForm] = useState(false)
const [formError, setFormError] = useState('')

  const categories = useMemo(
    () => ['Todas', ...new Set(products.map((product) => product.category))],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term)

      const matchesCategory =
        category === 'Todas' || product.category === category

      const matchesStatus =
        status === 'Todos' || product.status === status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, search, category, status])

  const totalProducts = products.length

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  )

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= product.minStock,
  ).length

  const outOfStock = products.filter(
    (product) => product.stock === 0,
  ).length

  const averageMargin =
    products.reduce((total, product) => {
      if (product.price === 0) return total
      return total + ((product.price - product.cost) / product.price) * 100
    }, 0) / products.length

  const handleDelete = (id: number) => {
    setProducts((current) =>
      current.filter((product) => product.id !== id),
    )
  }

  const handleAddProduct = () => {
  if (
    !newProduct.name.trim() ||
    !newProduct.sku.trim() ||
    !newProduct.category.trim() ||
    !newProduct.price ||
    !newProduct.cost ||
    !newProduct.stock
  ) {
    setFormError('Preencha todos os campos obrigatórios.')
    return
  }

  const price = Number(newProduct.price)
  const cost = Number(newProduct.cost)
  const stock = Number(newProduct.stock)
  const minStock = Number(newProduct.minStock)

  if (
    Number.isNaN(price) ||
    Number.isNaN(cost) ||
    Number.isNaN(stock) ||
    Number.isNaN(minStock)
  ) {
    setFormError('Informe valores numéricos válidos.')
    return
  }

  const status: ProductStatus =
    stock === 0
      ? 'Sem estoque'
      : stock <= minStock
        ? 'Baixo estoque'
        : 'Ativo'

  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1

  const product: Product = {
    id: newId,
    name: newProduct.name.trim(),
    sku: newProduct.sku.trim(),
    category: newProduct.category.trim(),
    price,
    cost,
    stock,
    minStock,
    sales: 0,
    status,
  }

  setProducts((current) => [...current, product])

  setNewProduct({
    name: '',
    sku: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '5',
  })

  setFormError('')
  setShowForm(false)
}

  return (
    <div className="products-page">
      <header className="products-header">
        <div>
          <span className="dashboard-eyebrow">CATÁLOGO</span>

          <h1>Produtos</h1>

          <p>
            Controle seu catálogo, estoque e rentabilidade em um só lugar.
          </p>
        </div>

        <button
          className="new-product-button"
          onClick={() => setShowForm((current) => !current)}
        >
          <span>+</span>
          Novo produto
        </button>
      </header>

      <section className="products-metrics">
        <article className="products-metric-card">
          <span>Produtos cadastrados</span>
          <strong>{totalProducts}</strong>
          <small>Catálogo atual</small>
        </article>

        <article className="products-metric-card">
          <span>Itens em estoque</span>
          <strong>{totalStock}</strong>
          <small>Quantidade disponível</small>
        </article>

        <article className="products-metric-card warning">
          <span>Estoque baixo</span>
          <strong>{lowStock}</strong>
          <small>Precisam de atenção</small>
        </article>

        <article className="products-metric-card danger">
          <span>Sem estoque</span>
          <strong>{outOfStock}</strong>
          <small>Produtos zerados</small>
        </article>

        <article className="products-metric-card positive">
          <span>Margem média</span>
          <strong>{averageMargin.toFixed(1)}%</strong>
          <small>Margem estimada</small>
        </article>
      </section>

      {showForm && (
       <div className="products-modal-backdrop">
  <section className="products-form-card">
          <div>
            <span className="dashboard-eyebrow">NOVO PRODUTO</span>
            <h2>Adicionar produto</h2>
            <p>
              O cadastro completo será conectado ao banco de dados na próxima
              etapa.
            </p>
          </div>

          <div className="products-form-grid">
  <input
    placeholder="Nome do produto"
    value={newProduct.name}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        name: event.target.value,
      }))
    }
  />

  <input
    placeholder="SKU / Código"
    value={newProduct.sku}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        sku: event.target.value,
      }))
    }
  />

  <input
    placeholder="Categoria"
    value={newProduct.category}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        category: event.target.value,
      }))
    }
  />

  <input
    type="number"
    min="0"
    step="0.01"
    placeholder="Preço de venda"
    value={newProduct.price}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        price: event.target.value,
      }))
    }
  />

  <input
    type="number"
    min="0"
    step="0.01"
    placeholder="Custo"
    value={newProduct.cost}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        cost: event.target.value,
      }))
    }
  />

  <input
    type="number"
    min="0"
    placeholder="Estoque inicial"
    value={newProduct.stock}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        stock: event.target.value,
      }))
    }
  />

  <input
    type="number"
    min="0"
    placeholder="Estoque mínimo"
    value={newProduct.minStock}
    onChange={(event) =>
      setNewProduct((current) => ({
        ...current,
        minStock: event.target.value,
      }))
    }
  />
  {formError && (
  <p className="products-form-error">
    {formError}
  </p>
)}

<div className="products-form-actions"></div>
</div>
          <div className="products-form-actions">
            <button
              className="products-secondary-button"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>

            <button
  className="new-product-button"
  onClick={handleAddProduct}
>
  Salvar produto
</button>
                  </div>
      </section>
    </div>
  )}

      <section className="products-toolbar">
        <div className="products-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar produto ou SKU..."
          />
        </div>

     <NexiaDropdown
  value={category}
  options={categories.map((item) => ({
    value: item,
    label: item,
  }))}
  onChange={setCategory}
/>

<NexiaDropdown
  value={status}
  options={[
    { value: 'Todos', label: 'Todos' },
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Baixo estoque', label: 'Baixo estoque' },
    { value: 'Sem estoque', label: 'Sem estoque' },
  ]}
  onChange={setStatus}
/>
      </section>

      <section className="products-card">
        <div className="products-table-header">
          <div>
            <span className="dashboard-eyebrow">INVENTÁRIO</span>
            <h2>Catálogo de produtos</h2>
          </div>

          <span className="products-count">
            {filteredProducts.length} produtos
          </span>
        </div>

        <div className="products-table">
          <div className="products-table-row products-table-heading">
            <span>Produto</span>
            <span>Categoria</span>
            <span>Preço</span>
            <span>Margem</span>
            <span>Estoque</span>
            <span>Status</span>
            <span />
          </div>

          {filteredProducts.map((product) => {
            const margin =
              ((product.price - product.cost) / product.price) * 100

            return (
              <div className="products-table-row" key={product.id}>
                <div className="product-main">
                  <div className="product-avatar">
                    {product.name.charAt(0)}
                  </div>

                  <div>
                    <strong>{product.name}</strong>
                    <small>{product.sku}</small>
                  </div>
                </div>

                <span className="product-category">
                  {product.category}
                </span>

                <strong>{formatCurrency(product.price)}</strong>

                <span className="product-margin">
                  {margin.toFixed(1)}%
                </span>

                <div className="product-stock">
                  <strong>{product.stock}</strong>
                  <small>mín. {product.minStock}</small>
                </div>

                <span
                  className={`product-status ${
                    product.status === 'Ativo'
                      ? 'active'
                      : product.status === 'Baixo estoque'
                        ? 'warning'
                        : 'danger'
                  }`}
                >
                  <i />
                  {product.status}
                </span>

                <button
                  className="product-delete"
                  onClick={() => handleDelete(product.id)}
                  aria-label={`Excluir ${product.name}`}
                >
                  ×
                </button>
              </div>
            )
          })}

          {filteredProducts.length === 0 && (
            <div className="products-empty">
              <strong>Nenhum produto encontrado</strong>
              <span>
                Tente alterar sua busca ou os filtros selecionados.
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Products