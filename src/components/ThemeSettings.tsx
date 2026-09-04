import { useEffect, useRef } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

type ThemeSettingsProps = {
  preference: ThemePreference
  onChange: (preference: ThemePreference) => void
  onClose: () => void
}

const options: Array<{ value: ThemePreference; label: string; icon: string }> = [
  { value: 'light', label: 'Claro', icon: '☀' },
  { value: 'system', label: 'Sistema', icon: '◐' },
  { value: 'dark', label: 'Escuro', icon: '☾' },
]

function ThemeSettings({ preference, onChange, onClose }: ThemeSettingsProps) {
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButton.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="settings-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="settings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="settings-header">
          <div>
            <span>PAINEL NEXIA</span>
            <h2 id="settings-title">Configurações</h2>
          </div>

          <button
            ref={closeButton}
            className="settings-close"
            onClick={onClose}
            aria-label="Fechar configurações"
          >
            ×
          </button>
        </header>

        <div className="settings-content">
          <div className="settings-label">
            <span>✦</span>

            <div>
              <strong>Aparência</strong>
              <p>Escolha como a NEXIA acompanha seu ambiente.</p>
            </div>
          </div>

          <div
            className="theme-options"
            role="radiogroup"
            aria-label="Tema da interface"
          >
            {options.map((option) => (
              <button
                key={option.value}
                role="radio"
                aria-checked={preference === option.value}
                className={preference === option.value ? 'selected' : ''}
                onClick={() => onChange(option.value)}
              >
                <i>{option.icon}</i>
                {option.label}
              </button>
            ))}
          </div>

          <p className="settings-note">
            Sua preferência é salva neste dispositivo.
          </p>
        </div>
      </section>
    </div>
  )
}

export default ThemeSettings