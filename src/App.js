import tw from 'twin.macro'
import styled from 'styled-components'

// Components
import { CalenderMain } from './components/index'

function App() {
  return (
    <MainContainer className="App">
      <CalenderMain />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  ${tw`
    w-full
  `}
`

export default App
