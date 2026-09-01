import { useState } from 'react'
import Dashboard from './Dashboard'
import Sales from './Sales'
import Clients from './Clients'

type Screen = 'dashboard' | 'sales' | 'clients'

function NexiaLayout() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`nexia-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>

      <aside className="nexia-sidebar">

        <div className="sidebar-logo">
          NEXIA
        </div>

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>

        <nav className="nexia-navigation">

          <button
            className={`sidebar-item ${
              screen === 'dashboard' ? 'active' : ''
            }`}
            onClick={() => setScreen('dashboard')}
          >
            <span>⌂</span>
            {!collapsed && 'Dashboard'}
          </button>

          <button className="sidebar-item">
            <span>✦</span>
            {!collapsed && 'Insights'}
          </button>

          <button
            className={`sidebar-item ${
              screen === 'sales' ? 'active' : ''
            }`}
            onClick={() => setScreen('sales')}
          >
            <span>↗</span>
            {!collapsed && 'Vendas'}
          </button>

          <button
            className={`sidebar-item ${
              screen === 'clients' ? 'active' : ''
            }`}
            onClick={() => setScreen('clients')}
          >
            <span>○</span>
            {!collapsed && 'Clientes'}
          </button>

          <button className="sidebar-item">
            <span>□</span>
            {!collapsed && 'Produtos'}
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button className="sidebar-item">
            <span>✧</span>
            {!collapsed && 'Autopilot'}
          </button>

          <button className="sidebar-item">
            <span>⚙</span>
            {!collapsed && 'Configurações'}
          </button>

        </div>

      </aside>

      <main className="nexia-main">

        {screen === 'dashboard' && (
          <Dashboard />
        )}

        {screen === 'sales' && (
          <Sales
            onBack={() => setScreen('dashboard')}
          />
        )}

        {screen === 'clients' && <Clients />}

      </main>

    </div>
  )
}

export default NexiaLayout