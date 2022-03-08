import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { useSelector } from 'react-redux'

// Route Layout
import Guestlayout from './utils/GuestLayout'
import PrivateRoute from './utils/PrivateRoute'

// Components & pages
import {
  LoginPage,
  CalenderPage,
  ReportPage,
  InfoPage,
  ErrorPage,
} from './pages/index'
import { MainWrapper, Header, NotifyTag, EventCard } from './components/index'

function App() {
  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const httpLink = new HttpLink({
    uri: 'http://192.168.98.59:4040/graphql',
  })

  const wsLink = new WebSocketLink({
    uri: 'ws://192.168.98.59:4040/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer${' '}${user && user.token}`,
        },
      },
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
    credentials: 'include',
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MainWrapper className="App">
          <NotifyTag />
          <Header />
          <Routes path="/" element={<Guestlayout />}>
            <Route path={`login`} element={<LoginPage />} />

            <Route
              path={`/`}
              element={
                <PrivateRoute>
                  <CalenderPage />
                </PrivateRoute>
              }
            />
            <Route
              path={`/report`}
              element={
                <PrivateRoute>
                  <ReportPage />
                </PrivateRoute>
              }
            />
            <Route
              path={`/info/type`}
              element={
                <PrivateRoute>
                  <InfoPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <EventCard />
        </MainWrapper>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
