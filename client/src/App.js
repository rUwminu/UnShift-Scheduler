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
import { SERVER_IP, SERVER_PORT } from './port.config'

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
  TestPage,
} from './pages/index'
import {
  MainWrapper,
  NotifyWrapper,
  Header,
  EventCard,
} from './components/index'

function App() {
  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const httpLink = new HttpLink({
    //uri: 'https://unshift-scheduler-api.herokuapp.com/graphql',
    uri: `http://${SERVER_IP}:${SERVER_PORT}/graphql`,
  })

  const wsLink = new WebSocketLink({
    //uri: 'wss://unshift-scheduler-api.herokuapp.com/graphql',
    uri: `ws://${SERVER_IP}:${SERVER_PORT}/graphql`,
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
    cache: new InMemoryCache(),
    link: splitLink,
    credentials: 'include',
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MainWrapper className="App">
          <NotifyWrapper>
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
              <Route
                path={`/test`}
                element={
                  <PrivateRoute>
                    <TestPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <EventCard />
          </NotifyWrapper>
        </MainWrapper>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
