import tw from 'twin.macro'
import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Route Layout
import Guestlayout from './utils/GuestLayout'
import PrivateRoute from './utils/PrivateRoute'

// Components
import { CalenderMain, LoginPage } from './components/index'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    uri: 'http://localhost:4000/graphql',
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MainContainer className="App">
          <Routes path="/" element={<Guestlayout />}>
            <Route path={`login`} element={<LoginPage />} />

            <Route
              path={`/`}
              element={
                <PrivateRoute>
                  <CalenderMain />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const MainContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-screen
    h-screen
  `}
`

export default App
