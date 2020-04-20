import React from "react";
import { Container } from "./pages/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { SettingsProvider } from "./contexts/SettingsContext";

const App = () => (
  <SettingsProvider>
    <ApolloProvider client={client}>
      <Router>
        <Container />
      </Router>
    </ApolloProvider>
  </SettingsProvider>
);

export default App;
