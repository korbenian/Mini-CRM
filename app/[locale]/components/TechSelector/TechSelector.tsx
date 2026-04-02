'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './TechSelector.module.scss'

interface TechSelectorProps {
  selected: string[] 
  onChange: (techs: string[]) => void 
}

const POPULAR_TECHS = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'C++', 'PHP', 'Ruby']

export default function TechSelector({ selected = [], onChange }: TechSelectorProps) {
  const [isAddingCustom, setIsAddingCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const t = useTranslations()

  const handleToggle = (tech: string) => {
    const newList = selected.includes(tech)
      ? selected.filter(t => t !== tech)
      : [...selected, tech]
    
    onChange(newList) 
  }

  const handleAddCustom = () => {
    const tech = customValue.trim()
    if (tech && !selected.includes(tech)) {
      onChange([...selected, tech])
    }
    setCustomValue('')
    setIsAddingCustom(false)
  }

  return (
    <div className={styles['tech-container']}>
      {POPULAR_TECHS.map(tech => (
        <button
          key={tech}
          type="button"
          onClick={() => handleToggle(tech)}
          className={`${styles['tech-button']} ${selected.includes(tech) ? styles.active : ''}`}
        >
          {tech}
        </button>
      ))}

      {selected.filter(t => !POPULAR_TECHS.includes(t)).map(tech => (
        <button
          key={tech}
          type="button"
          onClick={() => handleToggle(tech)}
          className={`${styles['tech-button']} ${styles.active}`}
        >
          {tech} ✕
        </button>
      ))}

      {!isAddingCustom ? (
        <button type="button" onClick={() => setIsAddingCustom(true)} className={styles['add-trigger-btn']}>
          + {t('profile.other')}
        </button>
      ) : (
        <div className={styles['add-custom-wrapper']}>
          <input
            type='text'
            value={customValue}
            onChange={e => setCustomValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
          />
          <button type="button" onClick={handleAddCustom} className={`${styles['tech-button']} ${styles.active}`}>
            {t('profile.add')}
          </button>
        </div>
      )}
    </div>
  )
}