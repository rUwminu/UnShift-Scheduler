import tw from 'twin.macro'
import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  split,
  HttpLink,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { useSelector } from 'react-redux'

// Route Layout
import Guestlayout from './utils/GuestLayout'
import PrivateRoute from './utils/PrivateRoute'

// Components
import { CalenderMain, LoginPage } from './components/index'

function App() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  })

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      lazy: true,
      reconnect: true,
    },
  })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: splitLink,
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
