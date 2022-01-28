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

// Route Layout
import Guestlayout from './utils/GuestLayout'
import PrivateRoute from './utils/PrivateRoute'

// Components & pages
import { LoginPage, ErrorPage } from './pages/index'
import { CalenderMain, NotifyTag } from './components/index'

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
          <NotifyTag />
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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const MainContainer = styled.div`
  ${tw`
    relative
    flex
    items-center
    justify-center
    w-screen
    h-screen
  `}
`

export default App
