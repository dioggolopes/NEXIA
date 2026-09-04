import { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Sales from './Sales'
import Clients from './Clients'
import Insights, { type AIContext } from './Insights'
import NexiaAI from './NexiaAI'
import ThemeSettings, { type ThemePreference } from './ThemeSettings'
import Products from './Products'

type Screen =
  | 'dashboard'
  | 'insights'
  | 'sales'
  | 'clients'
  | 'products'
  | 'ai'

function NexiaLayout() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [aiContext, setAiContext] = useState<AIContext | undefined>()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [theme, setTheme] = useState<ThemePreference>('system')

  useEffect(() => {
    const savedTheme = localStorage.getItem('nexia-theme') as ThemePreference | null
    const initialTheme =
      savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system'
        ? savedTheme
        : 'system'

    setTheme(initialTheme)
    applyTheme(initialTheme)

    function handleSystemThemeChange() {
      if (initialTheme === 'system') {
        applyTheme('system')
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  function applyTheme(preference: ThemePreference) {
    if (preference === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches

      document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light'
      return
    }

    document.documentElement.dataset.theme = preference
  }

  function changeTheme(preference: ThemePreference) {
    setTheme(preference)
    localStorage.setItem('nexia-theme', preference)
    applyTheme(preference)
  }

  function openAI(context?: AIContext) {
    setAiContext(context)
    setScreen('ai')
  }

  return (
    <div className={`nexia-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>

      <aside className="nexia-sidebar">

        <div className="sidebar-logo">
          NEXIA
        </div>

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
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

          <button
            className={`sidebar-item ${
              screen === 'insights' ? 'active' : ''
            }`}
            onClick={() => setScreen('insights')}
          >
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

         <button
  className={`sidebar-item ${
    screen === 'products' ? 'active' : ''
  }`}
  onClick={() => setScreen('products')}
>
  <span>□</span>
  {!collapsed && 'Produtos'}
</button>

        </nav>

        <div className="sidebar-bottom">

          <button className="sidebar-item">
            <span>✧</span>
            {!collapsed && 'Autopilot'}
          </button>

          <button
            className="sidebar-item"
            onClick={() => setSettingsOpen(true)}
            aria-label="Abrir configurações"
          >
            <span>⚙</span>
            {!collapsed && 'Configurações'}
          </button>

        </div>

      </aside>

      <main className="nexia-main">

        {screen === 'dashboard' && (
          <Dashboard onAskAI={openAI} />
        )}

        {screen === 'sales' && (
          <Sales
            onBack={() => setScreen('dashboard')}
          />
        )}

        {screen === 'clients' && <Clients />}

        {screen === 'products' && <Products />}

        {screen === 'insights' && (
          <Insights onAskAI={openAI} />
        )}

        {screen === 'ai' && (
          <NexiaAI
            context={aiContext}
            onBack={() => setScreen('insights')}
          />
        )}

      </main>

      {settingsOpen && (
        <ThemeSettings
          preference={theme}
          onChange={changeTheme}
          onClose={() => setSettingsOpen(false)}
        />
      )}

    </div>
  )
}

export default NexiaLayout