import { useState } from 'react'
import './App.css'

interface Character {
  id: number
  name: string
  image: string
}

const characters: Character[] = [
  { id: 0, name: "Viper Ning", image: "/src/assets/characters/viper-ning.jpg" },
  { id: 1, name: "Feria Shen", image: "/src/assets/characters/feria-shen.jpg" },
  { id: 2, name: "Tianhai", image: "/src/assets/characters/tianhai.jpg" },
  { id: 3, name: "Ziping Yin", image: "/src/assets/characters/ziping-yin.jpg" },
  { id: 4, name: "Temulch", image: "/src/assets/characters/temulch.jpg" },
  { id: 5, name: "Tarka Ji", image: "/src/assets/characters/tarka-ji.jpg" },
  { id: 6, name: "Tsuchimikado Kurumi", image: "/src/assets/characters/tsuchimikado-kurumi.jpg" },
  { id: 7, name: "Yoto Hime", image: "/src/assets/characters/yoto-hime.jpg" },
  { id: 8, name: "Valda Cui", image: "/src/assets/characters/valda-cui.jpg" },
  { id: 9, name: "Yueshan", image: "/src/assets/characters/yueshan.jpg" },
  { id: 10, name: "Wuchen", image: "/src/assets/characters/wuchen.jpg" },
  { id: 11, name: "Justina Gu", image: "/src/assets/characters/justina-gu.jpg" },
  { id: 12, name: "Takeda Nobutada", image: "/src/assets/characters/takeda-nobutada.jpg" },
  { id: 13, name: "Matari", image: "/src/assets/characters/matari.jpg" },
  { id: 14, name: "Akos Hu", image: "/src/assets/characters/akos-hu.jpg" },
  { id: 15, name: "Zai", image: "/src/assets/characters/zai.jpg" },
  { id: 16, name: "Tessa", image: "/src/assets/characters/tessa.jpg" },
  { id: 17, name: "Hadi Ismail", image: "/src/assets/characters/hadi-ismail.jpg" },
  { id: 18, name: "Shayol Wei", image: "/src/assets/characters/shayol-wei.jpg" },
  { id: 19, name: "Lyam Liu", image: "/src/assets/characters/lyam-liu.jpg" },
  { id: 20, name: "Kylin Zhang", image: "/src/assets/characters/kylin-zhang.jpg" },
  { id: 21, name: "Syra", image: "/src/assets/characters/syra.jpg" },
  { id: 22, name: "Lannie", image: "/src/assets/characters/lannie.jpg" },
  { id: 23, name: "Inor Van", image: "/src/assets/characters/inor-van.jpg" }
]

function App() {
  const [selectedHeroes, setSelectedHeroes] = useState<Set<number>>(new Set())
  const [randomHeroes, setRandomHeroes] = useState<number[]>([])
  const [selectionMode, setSelectionMode] = useState<'include' | 'exclude'>('include')
  const [teamMode, setTeamMode] = useState<'solo' | 'duo' | 'trio'>('solo')

  const toggleHero = (heroIndex: number) => {
    const newSelected = new Set(selectedHeroes)
    if (newSelected.has(heroIndex)) {
      newSelected.delete(heroIndex)
    } else {
      newSelected.add(heroIndex)
    }
    setSelectedHeroes(newSelected)
  }

  const selectRandomHero = () => {
    let availableHeroes: number[]
    
    if (selectionMode === 'include') {
      availableHeroes = Array.from(selectedHeroes)
      if (availableHeroes.length === 0) {
        alert('Пожалуйста, выберите хотя бы одного героя для включения!')
        return
      }
    } else {
      // exclude mode - get all heroes NOT in selectedHeroes
      availableHeroes = characters.map(char => char.id)
        .filter(id => !selectedHeroes.has(id))
      if (availableHeroes.length === 0) {
        alert('Все герои исключены! Снимите выделение с некоторых героев.')
        return
      }
    }
    
    const teamSize = teamMode === 'solo' ? 1 : teamMode === 'duo' ? 2 : 3
    
    if (availableHeroes.length < teamSize) {
      alert(`Недостаточно героев для режима ${teamMode}! Нужно минимум ${teamSize} героев.`)
      return
    }
    
    // Shuffle and select required number of heroes
    const shuffled = [...availableHeroes].sort(() => Math.random() - 0.5)
    const selectedTeam = shuffled.slice(0, teamSize)
    setRandomHeroes(selectedTeam)
  }

  return (
    <div className="app-container">
      <div className="controls">
        <div className="mode-selector">
          <label>
            <input
              type="radio"
              name="selectionMode"
              value="include"
              checked={selectionMode === 'include'}
              onChange={() => setSelectionMode('include')}
            />
            Включить выбранных героев
          </label>
          <label>
            <input
              type="radio"
              name="selectionMode"
              value="exclude"
              checked={selectionMode === 'exclude'}
              onChange={() => setSelectionMode('exclude')}
            />
            Исключить выбранных героев
          </label>
        </div>
        
        <div className="team-mode-selector">
          <label>
            <input
              type="radio"
              name="teamMode"
              value="solo"
              checked={teamMode === 'solo'}
              onChange={() => setTeamMode('solo')}
            />
            Соло (1 герой)
          </label>
          <label>
            <input
              type="radio"
              name="teamMode"
              value="duo"
              checked={teamMode === 'duo'}
              onChange={() => setTeamMode('duo')}
            />
            Дуо (2 героя)
          </label>
          <label>
            <input
              type="radio"
              name="teamMode"
              value="trio"
              checked={teamMode === 'trio'}
              onChange={() => setTeamMode('trio')}
            />
            Трио (3 героя)
          </label>
        </div>
        
        <button 
          onClick={selectRandomHero}
          className="random-button"
          disabled={selectionMode === 'include' ? selectedHeroes.size === 0 : selectedHeroes.size === characters.length}
        >
          {teamMode === 'solo' ? 'Выбрать случайного героя' : 
           teamMode === 'duo' ? 'Выбрать случайное дуо' : 
           'Выбрать случайное трио'}
        </button>
        {randomHeroes.length > 0 && (
          <div className="result">
            <h2>
              {teamMode === 'solo' ? 'Выбранный герой:' : 
               teamMode === 'duo' ? 'Выбранное дуо:' : 
               'Выбранное трио:'}
            </h2>
            <div className="selected-heroes">
              {randomHeroes.map((heroId) => {
                const hero = characters.find(char => char.id === heroId)
                return (
                  <div key={heroId} className="selected-hero">
                    <img src={hero?.image} alt={hero?.name} className="selected-hero-image" />
                    <span className="selected-hero-name">{hero?.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="hero">
        {characters.map((character) => (
          <div 
            key={character.id} 
            className={`grid-item ${selectedHeroes.has(character.id) ? 'selected' : ''} ${randomHeroes.includes(character.id) ? 'winner' : ''}`}
            onClick={() => toggleHero(character.id)}
          >
            <div className="hero-content">
              <div className="character-image">
                <img 
                  src={character.image}
                  alt={character.name}
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/80x80/4CAF50/white?text=${character.name.charAt(0)}`;
                  }}
                />
              </div>
              <span className="hero-name">{character.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
